module.exports = {
  default: [
    "--require", "src/bdd/stepDefinitions/**/*.js",
    "--require", "src/bdd/support/Hooks.js",
    "--format", "html:reports/cucumber-report.html",
    "src/bdd/features/**/*.feature"
  ]
};
