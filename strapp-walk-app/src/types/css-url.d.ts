// TypeScript declaration for CSS imports with ?url
declare module "*.css?url" {
  const url: string;
  export default url;
}
