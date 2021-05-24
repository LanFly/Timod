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
    '^.+\\.[jt]sx?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(lodash-es)/)"
  ],
  testPathIgnorePatterns: [],
  coveragePathIgnorePatterns: [
    '/__tests__/',
    '/bin/'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.ts'
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
