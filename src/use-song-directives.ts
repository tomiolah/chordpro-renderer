import { useEffect, useMemo, useState } from 'react';
import { DIRECTIVE_TOKEN, Token } from './parser';

export interface ISongDirectiveOptions {
  color?: string;
  bold?: boolean;
  indent?: boolean;
}

export type SongDirectioOptionsObject = Record<string, ISongDirectiveOptions>;

export function useSongDirectives(tokenizedData: Token[][] | undefined) {
  const songDirectives = useMemo<string[] | undefined>(
    () =>
      tokenizedData?.reduce(
        (acc, line) => [
          ...acc,
          ...line
            .filter(
              (lineToken): lineToken is DIRECTIVE_TOKEN =>
                lineToken.type === 'DIRECTIVE',
            )
            .map((lineDirectiveToken) => lineDirectiveToken.value)
            .filter((lineDirective) => !acc.includes(lineDirective)),
        ],
        [] as string[],
      ),
    [tokenizedData],
  );

  const [songDirectiveOptions, setSongDirectiveOptions] = useState<
    SongDirectioOptionsObject
  >({});

  useEffect(() => {
    let newColoring: SongDirectioOptionsObject = {};
    for (let directive of (songDirectives ?? [])) {
      newColoring[directive] = {};
    }
    setSongDirectiveOptions(newColoring);
  }, [songDirectives]);

  return { songDirectives, songDirectiveOptions, setSongDirectiveOptions };
}
