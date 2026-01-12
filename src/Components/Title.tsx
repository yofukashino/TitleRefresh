import { React } from "replugged/common";
import { Text } from "replugged/components";
import { SettingValues } from "@this";
import { DefaultSettings } from "@Consts";
import Icons from "@Icons";

import "./Title.css";

const Icon = ({ type }: { type: string }): React.ReactElement => {
  const iconUrl = SettingValues.useValue("iconUrl", DefaultSettings.iconUrl);
  switch (type) {
    default:
    case "replugged": {
      return <Icons.replugged className="titleRefreshIcon" />;
    }
    case "discord": {
      return <Icons.discord className="titleRefreshIcon" />;
    }
    case "custom": {
      return <img src={iconUrl} className="titleRefreshIcon titleRefreshIconImg" />;
    }
  }
};

export default ({ original }: { original: React.ReactElement }): React.ReactElement => {
  const title = SettingValues.useValue("title", DefaultSettings.title);
  const icon = SettingValues.useValue("icon", DefaultSettings.icon);
  const iconLocation = SettingValues.useValue("iconLocation", DefaultSettings.iconLocation);
  const location = SettingValues.useValue("location", DefaultSettings.location);
  const custom = SettingValues.useValue("custom", DefaultSettings.custom);

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
