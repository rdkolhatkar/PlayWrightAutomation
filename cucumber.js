// Below format is used for running the multiple feature files with different hooks and step definitions.
module.exports = {
  default: {
    require: [],
    format: ['progress', 'html:reports/cucumber-report.html'],
  },
  EcommerceApp: {
    paths: ['src/bdd/features/EcommerceApp.feature'],
    require: [
      'src/bdd/stepDefinitions/HooksImplementationSteps.js',
      'src/bdd/support/EcommerceAppHooks.js'
    ],
    format: ['progress', 'html:reports/cucumber-report.html']
  },
  ErrorValidation: {
    paths: ['src/bdd/features/ErrorValidation.feature'],
    require: [
      'src/bdd/stepDefinitions/ErrorValidationSteps.js',
      'src/bdd/support/ErrorValidationHooks.js'
    ],
    format: ['progress', 'html:reports/cucumber-report.html']
  }
};

