// postcss.config.js
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import tailwindcss from "tailwindcss";

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    postcssPresetEnv({
      stage: 0,
    }),
  ],
};
