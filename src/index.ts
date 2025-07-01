import { Logger } from "replugged";
import { defaultSettings } from "./lib/consts";
import { initSettings } from "./lib/ReactSettings";
import { registerSettings } from "./Components/Settings";
export const PluginLogger = Logger.plugin("TitleRefresh");
export const SettingValues = initSettings("dev.yofukashino.TitleRefresh", defaultSettings);
import "./style.css";

export const start = (): void => {
  registerSettings();
};
export { _getTitle } from "./plaintextFunctions";

export { Settings } from "./Components/Settings";
