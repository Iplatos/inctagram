/** svg imports with a ?url suffix can be used as the src value in Image components */
declare module "*.svg?url" {
  import { StaticImport } from "next/image";

  const defaultExport: StaticImport | string;
  export default defaultExport;
}