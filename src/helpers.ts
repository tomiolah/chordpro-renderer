import { DIRECTIVE_TOKEN, Token } from './parser';

const UPPERCASE_LETTERS = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' as const).split('');

export function camelCaseToLabel(input: string) {
  if (input.length <= 0) return '';
  return input
    .split('')
    .reduce((acc, letter, idx) => {
      if (idx === 0) {
        return [...acc, letter.toUpperCase()];
      }
      if (UPPERCASE_LETTERS.includes(letter)) {
        return [...acc, ' ', letter.toLowerCase()];
      }
      return [...acc, letter];
    }, [])
    .join('');
}

export function cameCaseToTitleCase(input: string) {
  if (input.length <= 0) return input;
  return input
    .split('')
    .map((l, idx) => (idx === 0 ? l.toUpperCase() : l))
    .join('');
}

export function lastDirective(
  arr: Token[][],
  lineIdx: number,
): DIRECTIVE_TOKEN | undefined {
  const slice = arr.slice(0, lineIdx);
  const lineLastDirectives = slice
    .map((line) => {
      const directivesInLine = line.filter((t) => t.type === 'DIRECTIVE');
      return (!directivesInLine.length
        ? undefined
        : directivesInLine.at(-1)) as DIRECTIVE_TOKEN | undefined;
    })
    .filter(
      (lineDirectiveToken): lineDirectiveToken is DIRECTIVE_TOKEN =>
        lineDirectiveToken !== undefined,
    );
  return !lineLastDirectives.length ? undefined : lineLastDirectives.at(-1);
}
