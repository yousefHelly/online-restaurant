const  nextJest = require('next/jest')
const createJestConfig = nextJest({
    dir:'./',
})

/**@type {import('jest').Config} */
const config = {
    testEnvironment:'jest-environment-jsdom',
    setupFilesAfterEnv:['<rootDir>/jest.setup.ts'],
    moduleDirectories:['<rootDir>/node_modules', '<rootDir>/app'],
    testPathIgnorePatterns:['<rootDir>/.next', '<rootDir>/node_modules', '<rootDir>/coverage', '<rootDir>/dist'],
    coveragePathIgnorePatterns:['<rootDir>/.next', '<rootDir>/node_modules', '<rootDir>/coverage', '<rootDir>/dist'],
    moduleNameMapper: {
        '^@/(.*)$':'<rootDir>/$1'
    }, 
    // resolver:'<rootDir>/.jest/resolver.js',
    clearMocks:true,
    testTimeout:20000,
    // collectCoverage:true,
    // coverageReporters:['html']
}
module.exports = async()=>({
    ...(await createJestConfig(config)())
})