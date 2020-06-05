module.exports = {
  plugins: ["stylelint-scss"],
  extends: [
    "./node_modules/prettier-stylelint/config.js",
    "stylelint-config-standard",
  ],
  ignoreFiles: ["**/node_modules/**"],
};
