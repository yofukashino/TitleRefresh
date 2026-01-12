import { Logger, settings } from "replugged";
import { DefaultSettings } from "@Consts";
import Settings from "@components/Settings";
export const PluginLogger = Logger.plugin("TitleRefresh", "#ffffff80");
export const SettingValues = settings.init("dev.yofukashino.TitleRefresh", DefaultSettings);

export const start = (): void => {
  Settings.registerSettings();
};
export { _getTitle } from "./plaintextFunctions";

export { Settings } from "@components/Settings";
