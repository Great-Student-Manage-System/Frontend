declare module "*.png";
declare module "*.svg" {
  import React = require("react");

  export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
// dotEnv를 통해 파일을 접근했지만, webpack version <>>5이후로는 보장되지 않는다면서 에러
// {
//   const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//   export default value;
// }
