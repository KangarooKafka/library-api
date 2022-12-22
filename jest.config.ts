// jest.config.ts
// @ts-ignore
import type { JestConfigWithTsJest } from 'ts-jest';

// Jest TypeScript configuration
const jestConfig: JestConfigWithTsJest = {
    collectCoverageFrom: ['**/*.{ts}'],
    moduleFileExtensions: ['js', 'ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/config/'],
    verbose: true
};

export default jestConfig;