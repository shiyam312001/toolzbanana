declare module "react-json-view" {
  import type { ComponentType } from "react";

  export interface ReactJsonViewProps {
    src: object;
    name?: string | false;
    collapsed?: boolean | number;
    displayDataTypes?: boolean;
    enableClipboard?: boolean;
    theme?: string;
    style?: React.CSSProperties;
  }

  const ReactJson: ComponentType<ReactJsonViewProps>;
  export default ReactJson;
}
