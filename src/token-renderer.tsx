import { Token } from "./parser";
import { IRendererState } from "./renderer-state.reducer";
import { StrJoin } from "./str-join";
import classNames from "classnames";
import { SongDirectioOptionsObject } from "./use-song-directives";

export function TokenRenderer({
  token,
  state,
  lastDirective,
  directiveColors,
}: {
  token: Token;
  state: IRendererState;
  lastDirective?: string;
  directiveColors: SongDirectioOptionsObject;
}) {
  switch (token.type) {
    case "EMPTY_LINE":
      return <br />;
    case "DIRECTIVE":
      return token.key === "title" ? (
        <h1 className="text-3xl" style={{ color: state.songTextColor }}>
          {token.value}
        </h1>
      ) : (
        <h2
          className={classNames(
            "font-bold font-mono pb-2",
            directiveColors[token.value]?.indent ? "pl-5" : undefined
          )}
          style={{
            color: state.directiveMatchSectionColor
              ? directiveColors[token.value]?.color ?? state.songTextColor
              : state.songTextColor,
          }}
        >
          {token.value}
        </h2>
      );
    case "SONG_TEXT":
      return (
        <StrJoin
          data={token.text.split(" ")}
          JoinElem={() => <>&#20;</>}
          className={classNames(
            lastDirective && directiveColors[lastDirective]?.bold
              ? "font-bold"
              : undefined,
            lastDirective && directiveColors[lastDirective]?.indent
              ? "pl-5"
              : undefined
          )}
          color={
            lastDirective
              ? directiveColors[lastDirective]?.color ?? state.songTextColor
              : state.songTextColor
          }
        />
      );
    case "CHORD":
    default:
      return (
        <b
        style={{ color: state.chordColor }}
        className={classNames(
            "absolute bottom-0.5 pb-2 font-mono",
            lastDirective && directiveColors[lastDirective]?.indent
              ? "pl-5"
              : undefined
          )}
        >
          {token.chord}
        </b>
      );
  }
}
