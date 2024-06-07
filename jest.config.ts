// https://zenn.dev/nabee/articles/0dc45c5404490c

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  coverageProvider: 'v8',

  testEnvironment: 'jest-environment-jsdom',
  // https://qiita.com/tanimoto-hikari/items/43e24849399d26ac04d8
  preset: 'ts-jest',
  transformIgnorePatterns: ['/node_modules'],
};

export default createJestConfig(config);
