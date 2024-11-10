module.exports = {
  preset: "jest-preset-angular",
  transform: {
    "^.+\\.(ts|html)$": "ts-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "html", "js", "json"],
  transformIgnorePatterns: ["node_modules/(?!@angular|rxjs)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$",
    },
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
