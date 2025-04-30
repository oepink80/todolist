export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Добавьте эту строку для поддержки псевдонимов
    },
};
