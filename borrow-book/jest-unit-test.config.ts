import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

module.exports = {
  moduleFileExtensions: ['js','json','ts'],
  rootDir: '.',
    testEnvironment: 'node',
  testRegex: ".*\\.spec\\.ts$",
  transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
  moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: pathsToModuleNameMapper(
      compilerOptions.paths /*, { prefix: '<rootDir>/src/' } */,
    ),
}
