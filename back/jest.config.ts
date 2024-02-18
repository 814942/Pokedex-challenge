import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    '/node_modules/(?!my-module).+\\.js$'
  ],
};

export default config;