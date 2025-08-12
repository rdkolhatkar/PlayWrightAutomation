# PlayWright Automation Framework

A comprehensive automated testing framework built using Playwright, supporting both UI and API testing with BDD Cucumber integration.

## 🚀 Features

- Web UI Automation using Page Object Model
- API Testing capabilities
- BDD Framework integration with Cucumber
- Excel Data Driven Testing
- Parallel Test Execution
- Multiple browser support (Chromium, Firefox, WebKit)
- HTML and Allure reporting
- GitHub Actions CI/CD integration
- Custom test retry mechanisms
- Screenshot and video capture on failure

## 🛠️ Tech Stack

- Playwright
- JavaScript/TypeScript
- Cucumber.js
- Node.js
- Excel.js for data management
- Allure Reporter

## 📁 Project Structure

```
├── src/
│   ├── api/
│   │   ├── data/
│   │   └── tests/
│   ├── bdd/
│   │   ├── features/
│   │   ├── stepDefinitions/
│   │   └── support/
│   ├── JavaScriptTest/
│   ├── TypeScriptTest/
│   └── web/
├── playwright-report/
├── test-results/
└── tests-examples/
```

## 🔧 Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## 🏃‍♂️ Running Tests

### Web Tests
```bash
npx playwright test
```

### BDD Tests
```bash
npm run test:bdd
```

### Specific Feature Tests
```bash
npm run test:EcommerceApp
npm run test:ErrorValidation
```

### Parallel Test Execution
```bash
npx playwright test src/web/tests --config testPlayWright.config.js
```

## 📊 Reports

- HTML reports are generated in `playwright-report/` directory
- Cucumber reports are generated in `reports/cucumber-report.html`
- Allure reports can be generated using:
```bash
npx playwright test --reporter=line,allure-playwright
allure generate ./allure-results --clean
allure open ./allure-report
```

## 🔄 CI/CD Integration

The project includes GitHub Actions workflow configuration for automated test execution in CI/CD pipeline.

## 📝 Configuration

- `playwright.config.js` - Main Playwright configuration
- `testPlayWright.config.js` - Custom test configuration
- `cucumber.js` - Cucumber configuration for BDD tests

## 📚 Documentation

For more information, refer to:
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)

## 🤝 Contributing

Feel free to submit issues and enhancement requests.

## 📜 License

This project is licensed under the MIT License.