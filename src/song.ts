export type RootNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'H';

export type Modifier = '#' | 'b';

export type BasicChord = `${RootNote}${Modifier}`;

export type ChordType = ''
  | `${'M' | "maj"}${'' | '7' | '9' | '11' | '13'}`
  | `${'m' | 'min'}${'' | '7' | '9' | '11' | '13'}`
  | `dim${'' | '7'}`
  | 'aug'
  | `sus${'2' | '4'}`
  | '5'
  | `6${'' | '/9'}`
  | `7${'' | 'b5' | '#5' | 'b9' | '#9' | 'b5b9' | 'b5#9' | '#5b9' | '#5#9' | 'sus2' | 'sus4' | 'sus2sus4'}`
  | `9${'' | 'b5' | '#5' | 'b5b9' | '#5#9'}`
  | `11${'' | '11b9'}`
  | `13${'' | 'b9' | '#9'}`
  | `add${'9' | '11' | '13'}`

export type ExtendedChord = `${BasicChord}${ChordType}`;

export type SlashChord = `${ExtendedChord}/${BasicChord}`