import Types from "./types";
export default [
  {
    find: ".setMinimumSize(",
    replacements: [
      {
        match: /title:\(0,\w+\.jsx\)/,
        replace: () =>
          `title:replugged.plugins.getExports("dev.yofukashino.TitleRefresh")?._getTitle`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
