import React, { useCallback, useMemo, useReducer, useState } from 'react';
import { TEST_SONG } from './data';
import { parseDocument, Token } from './parser';
import {
  IRendererState,
  RENDERER_DEFAULT_STATE,
  rendererStateReducer,
} from './renderer-state.reducer';
import { camelCaseToLabel, lastDirective } from './helpers';
import { TokenRenderer } from './token-renderer';
import { ColorPicker } from './color-picker';
import { Checkbox } from './checkbox';
import { useSongDirectives } from './use-song-directives';
import { SongDirectiveOptions } from './song-directive-options';
import classNames from 'classnames';

export default function App() {
  const [state, dispatch] = useReducer(
    rendererStateReducer,
    RENDERER_DEFAULT_STATE,
  );

  const [chordProText, setChordProText] = useState<string | undefined>(
    TEST_SONG as string | undefined,
  );
  const tokenizedData = useMemo<Token[][] | undefined>(
    () => (chordProText ? parseDocument(chordProText) : undefined),
    [chordProText],
  );

  const {
    songDirectives,
    songDirectiveOptions,
    setSongDirectiveOptions,
  } = useSongDirectives(tokenizedData);

  const getTextColorForLine = useCallback(
    (line: Token[], idx: number, arr: Token[][]) => {
      if (line.some((l) => l.type === 'CHORD')) {
        return state.chordColor;
      }
      if (line.every((t) => t.type !== 'DIRECTIVE')) {
        const prevDirective = lastDirective(arr, idx)?.value;
        return (
          songDirectiveOptions[prevDirective]?.color ?? state.songTextColor
        );
      }
    },
    [state, songDirectiveOptions],
  );

  return (
    <div className="flex flex-row h-full w-full">
      <div className="w-1/2 p-4 flex flex-col gap-5 border border-r-2 border-black">
        <div className="flex flex-col gap-2 h-1/5">
          <label>ChordPro Markup</label>
          <textarea
            className="w-full font-mono text-xs h-full"
            value={chordProText ?? ''}
            onChange={(e) =>
              setChordProText(
                e.target.value === '' ? undefined : e.target.value,
              )
            }
          />
        </div>
        {(Object.keys(RENDERER_DEFAULT_STATE) as (keyof IRendererState)[]).map(
          (property) => (
            <div key={property} className="flex flex-row gap-2">
              {property !== 'directiveMatchSectionColor' ? (
                <ColorPicker
                  value={state[property]}
                  label={`${camelCaseToLabel(property)}:`}
                  setValue={(newColor) =>
                    dispatch({ type: `Update:${property}`, value: newColor })
                  }
                />
              ) : (
                <Checkbox
                  checked={state[property]}
                  label={`${camelCaseToLabel(property)}:`}
                  onChange={() =>
                    dispatch({
                      type: `Update:${property}`,
                      value: !state[property],
                    })
                  }
                />
              )}
            </div>
          ),
        )}
        <hr className="border-black" />
        <SongDirectiveOptions
          songDirectives={songDirectives}
          songDirectiveOptions={songDirectiveOptions}
          setSongDirectiveOptions={setSongDirectiveOptions}
        />
      </div>
      <div
        className="w-1/2 p-4 h-screen overflow-y-auto"
        style={{ backgroundColor: state.backgroundColor }}
      >
        {tokenizedData
          ? tokenizedData.map((line, idx, arr) => (
              <div
                className="relative"
                key={`dataLine_${idx}`}
                style={{ color: getTextColorForLine(line, idx, arr) }}
              >
                {line.map((lineToken, tokenIdx) => (
                  <div
                    className={classNames(
                      'inline relative',
                      line.some((token) => token.type === 'CHORD')
                        ? 'leading-10'
                        : '',
                    )}
                    key={`dataLine_${idx}_${tokenIdx}`}
                  >
                    <TokenRenderer
                      state={state}
                      token={lineToken}
                      directiveColors={songDirectiveOptions}
                      lastDirective={lastDirective(arr, idx)?.value}
                    />
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
