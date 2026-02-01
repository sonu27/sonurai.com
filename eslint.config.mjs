import nextConfig from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";

const eslintConfig = [...nextConfig, ...typescriptConfig];

export default eslintConfig;
