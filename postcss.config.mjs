import postcssPresetEnv from "postcss-preset-env";
import autoprefixer from "autoprefixer";
import postcssColorFunction from "postcss-color-function";

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    "@tailwindcss/postcss", // Tailwind 4 plugin utama
    postcssColorFunction(), // handle color-mix() & oklch() fallback
    postcssPresetEnv({
      stage: 2,
      browsers: "last 3 versions, > 1%, not dead",
      features: {
        "color-function": true, // aktifkan konversi warna modern
        "oklab-function": true, // tambahkan fallback untuk oklch/oklab()
        "custom-properties": true,
        "nesting-rules": true,
      },
    }),
    autoprefixer(),
  ],
};

export default config;
