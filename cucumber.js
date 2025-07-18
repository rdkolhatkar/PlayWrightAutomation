module.exports = {
  default: [
    "--require", "src/bdd/stepDefinitions/**/*.js",
    "--format", "html:reports/cucumber-report.html",
    "src/bdd/features/**/*.feature"
  ]
};
