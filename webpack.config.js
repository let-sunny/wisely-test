const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".json", ".vue", ".ts"],
    alias: {
      "@": path.join(__dirname, "src"),
      "~": path.resolve(__dirname)
    }
  }
};
