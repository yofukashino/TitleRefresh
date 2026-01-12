import { util } from "replugged";
import { RadioGroup, Stack, Switch, TextInput } from "replugged/components";
import { PluginLogger, SettingValues } from "@this";
import { DefaultSettings } from "@Consts";

export const registerSettings = (): void => {
  type DefaultSettings = typeof DefaultSettings;
  type key = keyof DefaultSettings;
  type value = DefaultSettings[key];

  for (const key in DefaultSettings) {
    if (SettingValues.has(key as key)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${DefaultSettings[key]}.`);
    SettingValues.set(key as key, DefaultSettings[key] as value);
  }
};

export const Settings = (): React.ReactElement => {
  const customTitle = SettingValues.useValue("custom", DefaultSettings.custom);
  const iconType = SettingValues.useValue("icon", DefaultSettings.icon);

  return (
    <Stack gap={24}>
      <Switch
        label="Custom Title"
        description="Custom Static title that doesn't change with location."
        {...util.useSetting(SettingValues, "custom", DefaultSettings.custom)}
      />
      <TextInput
        label="Title"
        description="Static Title you want to be displayed in titlebar"
        disabled={!customTitle}
        placeholder="Enter your title here"
        {...util.useSetting(SettingValues, "title", DefaultSettings.title)}
      />
      <RadioGroup
        label="Icon"
        description="What icon to show in titlebar beside title."
        disabled={!customTitle}
        options={[
          { name: "Replugged", value: "replugged" },
          { name: "Discord", value: "discord" },
          { name: "Custom", value: "custom" },
        ]}
        {...util.useSetting(SettingValues, "icon", DefaultSettings.icon)}
      />
      <TextInput
        label="Custom Icon Link"
        description="MUST BE DIRECT IMG LINK! (Recommended Hosts are github, discord and imgur)."
        disabled={!customTitle || iconType !== "custom"}
        placeholder="Enter Link of your custom icon"
        {...util.useSetting(SettingValues, "iconUrl", DefaultSettings.iconUrl)}
      />
      <RadioGroup
        label="Icon Position"
        description="Whether to show icon before text or after"
        disabled={!customTitle}
        options={[
          { name: "Before", value: "before" },
          { name: "After", value: "after" },
        ]}
        {...util.useSetting(SettingValues, "iconLocation", DefaultSettings.iconLocation)}
      />
      <RadioGroup
        label="Title Position"
        description="Whether to show title in center or left"
        options={[
          { name: "Center", value: "center" },
          { name: "Left", value: "left" },
        ]}
        {...util.useSetting(SettingValues, "location", DefaultSettings.location)}
      />
    </Stack>
  );
};

export default { Settings, registerSettings };
