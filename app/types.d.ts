declare type Theme = "dark" | "light";

declare type ThemeState = {
  theme: Theme;
} | null;

declare type ThemeReducerActionType = "get_theme" | "set_theme";

declare interface ThemeReducerAction {
  type: ThemeReducerActionType;
  value: Theme;
}

declare interface UserSettingsProps {
  theme: "dark" | "light";
}

declare interface NavigationLink {
  href: string;
  text: string;
  target: "_blank" | "_self" | "_parent" | "_top";
  activeColor: string;
  hoverColor: string;
}
