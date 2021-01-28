module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/tests/**/*",
    "!src/apps/api/internal/**/*",
  ],
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^Viewobjects(.*)$": "<rootDir>/src/views/$1",
    "^Gateways(.*)$": "<rootDir>/src/domain/gateways/$1",
    "^Models(.*)$": "<rootDir>/src/domain/models/$1",
    "^Repositories(.*)$": "<rootDir>/src/domain/repositories/$1",
    "^Errors(.*)$": "<rootDir>/src/errors/$1",
    "^Injection(.*)$": "<rootDir>/src/injection/$1",
    "^Usecases(.*)$": "<rootDir>/src/usecases/$1",
    "^Utils(.*)$": "<rootDir>/src/utils/$1",
    "^Common(.*)$": "<rootDir>/src/common/$1",
    "^Configs(.*)$": "<rootDir>/src/configs/$1",
    "^Apps(.*)$": "<rootDir>/src/apps/$1",
    "^Tests(.*)$": "<rootDir>/src/tests/$1",
  },
  // "globalSetup": "./src/tests/setup.js",
  // "globalTeardown": "./src/tests/teardown.js"
};
