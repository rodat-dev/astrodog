export function themeReducer(
  state: ThemeState,
  action: ThemeReducerAction
): ThemeState {
  if (action.type === "set_theme") {
    state = { theme: action.value };
    window.localStorage.setItem("theme", action.value);
    requestIdleCallback(
      () => (document.documentElement.className = `${action.value}`)
    );
  }

  return state;
}
