export interface IRendererState {
  chordColor: string;
  directiveMatchSectionColor: boolean;
  songTextColor: string;
  backgroundColor: string;
}

export const RENDERER_DEFAULT_STATE: IRendererState = {
  chordColor: "#f59e0b",
  songTextColor: "#000000",
  backgroundColor: "#ffffff",
  directiveMatchSectionColor: true,
}

export type RendererStateReducerAction = {
  type: `Update:${Exclude<keyof IRendererState, "directiveMatchSectionColor">}`;
  value: string;
} | { type: "Update:directiveMatchSectionColor", value: boolean };

export function rendererStateReducer(state: IRendererState, action: RendererStateReducerAction): IRendererState {
  switch (true) {
    case action.type.startsWith("Update:"): {
      const property = (action.type.split(":") as ["Update:", keyof IRendererState])[1];
      return { ...state, [property]: action.value };
    }
    default:
      return state;
  }
}
