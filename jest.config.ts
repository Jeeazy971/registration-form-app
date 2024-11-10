import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
