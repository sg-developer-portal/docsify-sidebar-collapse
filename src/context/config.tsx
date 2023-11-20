import { createContext } from "preact";
import { useContext } from "preact/hooks";

type ConfigContext = {
  basePath: string;
};

export const ConfigContext = createContext<ConfigContext>({ basePath: "/" });
export const useConfig = () => useContext(ConfigContext);
