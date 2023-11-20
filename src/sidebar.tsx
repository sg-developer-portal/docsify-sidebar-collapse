import type { Token as Tkn } from "marked";
import History from "./components/history";
import { ConfigContext } from "./context/config";
import Token from "./components/token";

type SidebarProps = {
  tokens: Tkn[];
  basePath: string;
};

export default function Sidebar({ tokens, basePath }: SidebarProps) {
  return (
    <History>
      <ConfigContext.Provider value={{ basePath }}>
        {tokens.map((t) => (
          <Token token={t} />
        ))}
      </ConfigContext.Provider>
    </History>
  );
}
