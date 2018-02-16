declare module "*.css" {
  interface CSSModule {
    [name: string]: string;
  }
  const nameMap: CSSModule;
  export default nameMap;
}

declare module "*.scss" {
  interface CSSModule {
    [name: string]: string;
  }
  const nameMap: CSSModule;
  export default nameMap;
}
