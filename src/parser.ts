export interface EMPTY_LINE_TOKEN {
  type: 'EMPTY_LINE';
}

export interface DIRECTIVE_TOKEN {
  type: 'DIRECTIVE';
  key: string;
  value: string;
}

export interface CHORD_TOKEN {
  type: 'CHORD';
  chord: string;
}

export interface SONG_TEXT_TOKEN {
  type: 'SONG_TEXT';
  text: string;
}

export type Token =
  | EMPTY_LINE_TOKEN
  | DIRECTIVE_TOKEN
  | CHORD_TOKEN
  | SONG_TEXT_TOKEN;

function parseLine(line: string): Token[] {
  if (line === '') {
    return [{ type: 'EMPTY_LINE' }];
  }
  if (line.startsWith('{')) {
    const directiveRegex = /\{([a-zA-Z]+): ([a-zA-Z 0-9]+)\}/g;
    const directiveRes = directiveRegex.exec(line);
    return [
      {
        type: 'DIRECTIVE',
        key: directiveRes[1],
        value: directiveRes[2],
      },
    ];
  }

  const tokenizedSongLine: Token[] = line
    .split(/(\[[a-zA-Z#0-9/]+\])+/g)
    .filter((token) => token !== '')
    .map((lineToken) => {
      const chordProChordRegex = /(\[[a-zA-Z#0-9/]+\])+/g;
      const isChord = chordProChordRegex.test(lineToken);
      if (isChord) {
        const chordProChordRegexWCaptureGroup = /(\[([a-zA-Z#0-9/]+)\])+/g;
        const chordData = chordProChordRegexWCaptureGroup.exec(lineToken);
        return { type: 'CHORD', chord: chordData.at(-1) };
      }
      return { type: 'SONG_TEXT', text: lineToken };
    });
  return tokenizedSongLine;
}

export const tokenizedDocumentTextRep = (docTokens: Token[][]) =>
  docTokens.map((docTokenLine) =>
    docTokenLine
      .map((token) => {
        switch (token.type) {
          case 'EMPTY_LINE':
            return '{EMPTY_LINE}';
          case 'CHORD':
            return `{CHORD, ${token.chord}}`;
          case 'DIRECTIVE':
            return `{DIRECTIVE, ${token.key}, ${token.value}}`;
          case 'SONG_TEXT':
            return `{SONG_TEXT, "${token.text}"}`;
          default:
            return '{?}';
        }
      })
      .join(''),
  );

export function parseDocument(documentContent: string) {
  const documentLines = documentContent.split('\n');
  const res = documentLines.map(parseLine);
  return res;
}
