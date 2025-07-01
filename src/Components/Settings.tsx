import { util } from "replugged";
import { FormItem, RadioItem, SwitchItem, TextInput } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Types from "../types";
import { React } from "replugged/common";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${defaultSettings[key]}.`);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};

export const Settings = () => {
  const disabled = React.useMemo(
    () => !SettingValues.get("custom", defaultSettings.custom),
    [SettingValues.get("custom", defaultSettings.custom)],
  );
  const imgLinkDisabled = React.useMemo(
    () => disabled || SettingValues.get("icon", defaultSettings.icon) !== "custom",
    [disabled, SettingValues.get("icon", defaultSettings.icon)],
  );
  return (
    <div>
      <SwitchItem
        note="Custom Static title that doesn't change with location."
        {...util.useSetting(SettingValues, "custom", defaultSettings.custom)}>
        Custom Title
      </SwitchItem>
      <FormItem
        disabled={disabled}
        title="Title"
        note="Static Title you want to be displayed in titlebar"
        style={{ marginBottom: 20 }}
        divider={true}>
        <TextInput
          disabled={disabled}
          placeholder="Enter your title here"
          {...util.useSetting(SettingValues, "title", defaultSettings.title)}
        />
      </FormItem>
      <RadioItem
        disabled={disabled}
        note="What icon to show in titlebar beside title."
        options={[
          { name: "Replugged", value: "replugged" },
          { name: "Discord", value: "discord" },
          { name: "Custom", value: "custom" },
        ]}
        {...util.useSetting(SettingValues, "icon", defaultSettings.icon)}>
        Icon
      </RadioItem>
      <FormItem
        disabled={imgLinkDisabled}
        title="Custom Icon Link"
        note={"MUST BE DIRECT IMG LINK! (Recommended Hosts are github, discord and imgur)."}
        style={{ marginTop: 20, marginBottom: 20 }}
        divider={true}>
        <TextInput
          disabled={imgLinkDisabled}
          placeholder="Enter Link of your custom icon"
          {...util.useSetting(SettingValues, "iconUrl", defaultSettings.iconUrl)}
        />
      </FormItem>
      <RadioItem
        disabled={disabled}
        note="Whether to show icon before text or after"
        options={[
          { name: "Before", value: "before" },
          { name: "After", value: "after" },
        ]}
        {...util.useSetting(SettingValues, "iconLocation", defaultSettings.iconLocation)}>
        Icon Position
      </RadioItem>
      <RadioItem
        note="Whether to show title in center or left"
        options={[
          { name: "Center", value: "center" },
          { name: "Left", value: "left" },
        ]}
        {...util.useSetting(SettingValues, "location", defaultSettings.location)}>
        Title Position
      </RadioItem>
    </div>
  );
};
