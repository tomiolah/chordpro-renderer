import React, { Dispatch, SetStateAction } from 'react';
import { ColorPicker } from './color-picker';
import { Checkbox } from './checkbox';
import { SongDirectioOptionsObject } from './use-song-directives';

interface ISongDirectiveOptionsProps {
  songDirectives: string[] | undefined;
  songDirectiveOptions: SongDirectioOptionsObject;
  setSongDirectiveOptions: Dispatch<SetStateAction<SongDirectioOptionsObject>>;
}

export const SongDirectiveOptions = ({
  songDirectives,
  songDirectiveOptions,
  setSongDirectiveOptions,
}: ISongDirectiveOptionsProps) => (
  <>
    {songDirectives?.length ? (
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold pb-5">Directive options</h2>
        {songDirectives.map((directive) => (
          <div key={directive} className="flex flex-col gap-2">
            <label className="font-bold underline">{directive}</label>
            <div className="pl-5 flex flex-row justify-between">
              <ColorPicker
                key={`${directive}--color`}
                name={`${directive}--color`}
                label="Color:"
                value={songDirectiveOptions[directive]?.color}
                setValue={(newColor) =>
                  setSongDirectiveOptions((prev) => ({
                    ...prev,
                    [directive]: { ...prev[directive], color: newColor },
                  }))
                }
              />

              <Checkbox
                label="Bold:"
                key={`${directive}--bold`}
                name={`${directive}--bold`}
                checked={songDirectiveOptions[directive]?.bold}
                onChange={() =>
                  setSongDirectiveOptions((prev) => ({
                    ...prev,
                    [directive]: {
                      ...prev[directive],
                      bold: prev[directive]?.bold ? false : true,
                    },
                  }))
                }
              />

              <Checkbox
                label="Indent:"
                key={`${directive}--indent`}
                name={`${directive}--indent`}
                checked={songDirectiveOptions[directive]?.indent}
                onChange={() =>
                  setSongDirectiveOptions((prev) => ({
                    ...prev,
                    [directive]: {
                      ...prev[directive],
                      indent: prev[directive]?.indent ? false : true,
                    },
                  }))
                }
              />
            </div>
          </div>
        ))}
      </div>
    ) : null}
  </>
);
