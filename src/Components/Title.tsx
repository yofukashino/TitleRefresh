import { React } from "replugged/common";
import { Text } from "replugged/components";
import Icons from "./Icons";
import { SettingValues } from "..";
import { defaultSettings } from "../lib/consts";
const Icon = ({ type }: { type: string }): React.ReactElement => {
  const iconUrl = SettingValues.use("iconUrl", defaultSettings.iconUrl);
  switch (type) {
    default:
    case "replugged": {
      return <Icons.replugged className="titleRefreshIcon" width={16} height={16} />;
    }
    case "discord": {
      return (
        <Icons.discord
          className="titleRefreshIcon"
          width={16}
          height={16}
          style={{ color: "var(--icon-primary)" }}
        />
      );
    }
    case "custom": {
      return <img src={iconUrl} className="titleRefreshIcon titleRefreshIconImg" />;
    }
  }
};
export default ({ original }: { original: React.ReactElement }) => {
  const title = SettingValues.use("title", defaultSettings.title);
  const icon = SettingValues.use("icon", defaultSettings.icon);
  const iconLocation = SettingValues.use("iconLocation", defaultSettings.iconLocation);
  const location = SettingValues.use("location", defaultSettings.location);
  const custom = SettingValues.use("custom", defaultSettings.custom);

  const before = React.useMemo(() => iconLocation === "before", [iconLocation]);
  const center = React.useMemo(() => location === "center", [location]);

  const key = React.useMemo(
    () => `${custom ? "custom" : "original"} ${iconLocation} ${location}`,
    [custom, iconLocation, location],
  );

  return (
    <div key={key} className={`titleRefreshed${center ? "" : " titleRefreshedLeft"}`}>
      {custom ? (
        <>
          {before && <Icon key={icon} type={icon} />}
          <Text.Normal key={title} variant="text-sm/medium">
            {title}
          </Text.Normal>
          {!before && <Icon key={icon} type={icon} />}
        </>
      ) : (
        original
      )}
    </div>
  );
};
