import { Divider, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useTheming } from "../../Common/Custom Hooks/ThemeOptionsContext";
import { ThemeOptionsModel } from "../../models/ThemeOptionsModel";
import { useAppDispatch } from "../../redux/hooks";
import { updateThemeOptionsAsync } from "../../redux/slice/themeOptions.slice";
const ThemeOptionsComponent: React.FC = () => {

  const dispatch = useAppDispatch();

  const { themeOptions, updateThemingOptions,resetToDefault } = useTheming();
  const [updatedThemingOptions, setUpdatedThemingOptions] =
    useState(themeOptions);

  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">(
    updatedThemingOptions.pageStyleSetting
  );

  const [selectedMenuPosition, setSelectedMenuPosition] = useState<
    "top" | "left"
  >(updatedThemingOptions.navigationMode);

  useEffect(() => {
    // Update CSS variables whenever themeOptions change
    document.documentElement.style.setProperty(
      "--page-style-setting",
      updatedThemingOptions.pageStyleSetting
    );
    document.documentElement.style.setProperty(
      "--theme-color",
      updatedThemingOptions.themeColor
    );
    document.documentElement.style.setProperty(
      "--navigation-mode",
      updatedThemingOptions.navigationMode
    );
  }, [updatedThemingOptions]);

  const handlePrimaryColorChange = (color: string) => {
    setUpdatedThemingOptions({ ...updatedThemingOptions, themeColor: color });
  };

  const handleNavigationModeChange = (mode: "left" | "top") => {
    setUpdatedThemingOptions({
      ...updatedThemingOptions,
      navigationMode: mode,
    });
    setSelectedMenuPosition(mode);
  };

  const handleThemeButtonClick = (theme: "light" | "dark") => {
    setUpdatedThemingOptions({
      ...updatedThemingOptions,
      pageStyleSetting: theme,
    });
    setSelectedTheme(theme);
  };

  const applyTheme = () => {
    updateThemingOptions(updatedThemingOptions); // Update the context with the new theme

    const { pageStyleSetting, themeColor, navigationMode }: ThemeOptionsModel =
      updatedThemingOptions;
    const updatedOptions = {
      id:0,
      pageStyleSetting,
      themeColor,
      navigationMode,
    };
    dispatch(updateThemeOptionsAsync(updatedOptions));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}> 

      <label>Page Style Setting: </label>

      <div style={{ display: "flex", marginTop: "8px" }}>
        <div
          className="theme-button light-theme"
          style={{
            transform: selectedTheme === "light" ? "scale(1.2)" : "",
          }}
          onClick={() => handleThemeButtonClick("light")}
        >
          <div className="light-theme-inside"></div>
        </div>

        <div
          className="theme-button dark-theme"
          style={{
            transform: selectedTheme === "dark" ? "scale(1.2)" : "",
          }}
          onClick={() => handleThemeButtonClick("dark")}
        >
          <div className="dark-theme-inside"></div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Divider />
      </div>
      <div
        style={{ marginTop: "15px", display: "flex", flexDirection: "column" }}
      >
        <label>Primary Color:</label>
        <Input
          style={{ width: "70px", height: "50px" }}
          type="color"
          value={updatedThemingOptions.themeColor}
          onChange={(e) => handlePrimaryColorChange(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Divider />
      </div>

      <label>Navigation Mode:</label>

      <div style={{ display: "flex", marginTop:"8px"}}>
        <div
          className="Nav-button top-sidebar"
          style={{
            transform: selectedMenuPosition === "top" ? "scale(1.2)" : "",
          }}
          onClick={() => handleNavigationModeChange("top")}
        >
          <div className="top-sidebar-inside"></div>
        </div>

        <div
          className="Nav-button left-sidebar"
          style={{
            transform: selectedMenuPosition === "left" ? "scale(1.2)" : "",
          }}
          onClick={() => handleNavigationModeChange("left")}
        >
          <div className="left-sidebar-inside-div1"></div>
          <div className="left-sidebar-inside-div2"></div>
        </div>
      </div>


      <div style={{ marginTop: "20px" }}>
        <Divider />
      </div>
      <div>
        <button onClick={resetToDefault}>Reset to Default</button>
      </div>
      
      <Button onClick={applyTheme} style={{ marginTop: "15px" }}>
        Update
      </Button>
    </div>
  );
};

export default ThemeOptionsComponent;
