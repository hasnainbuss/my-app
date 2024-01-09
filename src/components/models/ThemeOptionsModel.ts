export interface ThemeOptionsModel {
  id: number;
  pageStyleSetting: "light" | "dark"; // For light mode or dark mode
  themeColor: string; // An array of theme colors
  navigationMode: "left" | "top"; // For sidebar placement
}
