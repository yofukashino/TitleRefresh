import Types from "./types";
export default [
  {
    find: ".setMinimumSize(",
    replacements: [
      {
        match: /title:(\(0,\w+\.jsx\)\(\w+,{}\))/,
        replace: (_, original: string) =>
          `title:replugged.plugins.getExports("dev.yofukashino.TitleRefresh")?._getTitle(${original})`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
