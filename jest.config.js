module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: 'tsconfig.test.json'
    }
  },
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testPathIgnorePatterns: [],
  coveragePathIgnorePatterns: [
    '/__tests__/',
    '/bin/'
  ],
  collectCoverageFrom: [
    'lib/**/*.js'
  ],
  coverageReporters: [
    'json',
    'text',
    'text-summary',
    'html'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  snapshotSerializers: [
    'jest-serializer-path'
  ]
}
