import 'jest-preset-angular/setup-jest';

export default {
  preset: 'jest-preset-angular',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
