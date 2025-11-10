import postcssPresetEnv from "postcss-preset-env";
import postcssNesting from "postcss-nesting";
import autoprefixer from "autoprefixer";

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    postcssNesting(),
    "@tailwindcss/postcss",
    autoprefixer(),
    postcssPresetEnv({
      stage: 3,
      browsers: "last 3 versions, > 1%, not dead",
      features: {
        "nesting-rules": true,
        "custom-properties": true,
      },
    }),
  ],
};

export default config;
