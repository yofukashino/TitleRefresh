import { types } from "replugged";

export namespace Types {
  export import DefaultTypes = types;
  export type GenericModule = Record<string, DefaultTypes.AnyFunction>;
  export type Jsonifiable =
    | null
    | undefined
    | boolean
    | number
    | string
    | Jsonifiable[]
    | { [key: string]: Jsonifiable };
  export interface Settings {
    custom: boolean;
    title: string;
    icon: "replugged" | "discord" | "custom";
    iconUrl: string;
    iconLocation: "before" | "after";
    location: "left" | "center";
  }
}
export default Types;
