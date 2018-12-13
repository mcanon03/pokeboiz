module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "prettier", "prettier/standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
