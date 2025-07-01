import { settings } from "replugged";
import { React } from "replugged/common";
import Types from "../types";

const managers = new Map<string, unknown>();

export default class ReactSettings<
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
> extends settings.SettingsManager<T, D> {
  #listeners = new Map<string, Set<() => void>>();
  public use<K extends Extract<keyof T, string>, F extends T[K] | undefined>(
    key: K,
    fallback?: F,
  ): K extends D
    ? NonNullable<T[K]>
    : F extends null | undefined
    ? T[K] | undefined
    : NonNullable<T[K]> | F {
    const [setting, setSetting] = React.useState(super.get(key, fallback));
    if (!this.#listeners.has(key)) this.#listeners.set(key, new Set());
    const listeners = this.#listeners.get(key);
    React.useEffect(() => {
      const cb = (): void => setSetting(super.get(key, fallback));
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
        if (!listeners.size) this.#listeners.delete(key);
      };
    }, []);
    return setting;
  }
  public set<K extends Extract<keyof T, string>>(key: K, value: T[K]): void {
    super.set(key, value);
    if (this.#listeners.has(key)) this.#listeners.get(key).forEach((c) => c());
  }
}

export function initSettings<
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T = never,
>(namespace: string, defaultSettings?: Partial<T>): ReactSettings<T, D> {
  if (managers.has(namespace)) {
    return managers.get(namespace)! as ReactSettings<T, D>;
  }
  settings.init(namespace, defaultSettings);
  const manager = new ReactSettings<T, D>(namespace, (defaultSettings || {}) as Partial<T>);
  managers.set(namespace, manager);
  manager.load();
  return manager;
}
