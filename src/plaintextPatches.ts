import Types from "@Types";

export default [
  {
    find: ".setMinimumSize(",
    replacements: [
      {
        match: /title:\(0,\i\.jsx\)/,
        replace: () => `title:$exports?._getTitle`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
