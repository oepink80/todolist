export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Добавьте эту строку для поддержки псевдонимов
    },
    globals: { Request:Request, TransformStream:TransformStream, BroadcastChannel: BroadcastChannel, TextEncoder: TextEncoder, TextDecoder: TextDecoder, Response: Response },
};
