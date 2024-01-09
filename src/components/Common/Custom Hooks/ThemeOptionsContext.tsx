import { ThemeOptionsModel } from "../../../components/models/ThemeOptionsModel";
import { useAppSelector } from "../../../components/redux/hooks";
import { themeOptionsSelectors } from "../../../components/redux/slice/themeOptions.slice";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the context
interface ThemeOptionsContextType {
  themeOptions: ThemeOptionsModel;
  updateThemingOptions: (newOptions: ThemeOptionsModel) => void;
  resetToDefault: () => void; // Include the new function here
}

const ThemeOptionsContext = createContext<ThemeOptionsContextType | undefined>(
  undefined
);

export const useTheming = (): ThemeOptionsContextType => {
  const context = useContext(ThemeOptionsContext);
  if (!context) {
    throw new Error("useTheming must be used within a ThemeOptionsProvider");
  }
  return context;
};

// Create a provider component
export const ThemeOptionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const defaultThemeOptions: ThemeOptionsModel = {
    id: 0,
    pageStyleSetting: "dark",
    themeColor: "#1677ff", // Default primary color as a string
    navigationMode: "left",
  };

  const [themeOptions, setThemingOptions] = useState<ThemeOptionsModel>(() => {
    // Load theme options from local storage or provide default values
    const storedOptions = localStorage.getItem("themeOptions");
    return storedOptions ? JSON.parse(storedOptions) : defaultThemeOptions; // Use the default theme options if local storage data is not available
  });
  const updateThemingOptions = (newOptions: ThemeOptionsModel) => {
    setThemingOptions(newOptions);
  };

  const resetToDefault = () => {
    setThemingOptions(defaultThemeOptions);
  };

  // Fetch the default theme from Redux when the component mounts
  const reduxDefaultTheme = useAppSelector(themeOptionsSelectors.selectAll)[0];

  useEffect(() => {
    // If the default theme from Redux exists and is different from the current theme, update the theme
    if (
      reduxDefaultTheme &&
      (reduxDefaultTheme.pageStyleSetting !== themeOptions.pageStyleSetting ||
        reduxDefaultTheme.themeColor !== themeOptions.themeColor ||
        reduxDefaultTheme.navigationMode !== themeOptions.navigationMode)
    ) {
      setThemingOptions(reduxDefaultTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxDefaultTheme]);

  useEffect(() => {
    // Save theme options to local storage whenever they change
    localStorage.setItem("themeOptions", JSON.stringify(themeOptions));
  }, [themeOptions]);

  return (
    <ThemeOptionsContext.Provider
      value={{ themeOptions, updateThemingOptions, resetToDefault }}
    >
      {children}
    </ThemeOptionsContext.Provider>
  );
};
