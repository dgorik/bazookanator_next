import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

//You're importing ESLint rules from Next.js using the FlatCompat helper, which allows you to use older .eslintrc-style configurations (like next/core-web-vitals and next/typescript) in the newer Flat Config format introduced in ESLint v8.

