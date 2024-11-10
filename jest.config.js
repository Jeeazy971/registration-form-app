module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|html)$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!@angular|@ngrx|rxjs|zone.js)"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
    },
  },
};
