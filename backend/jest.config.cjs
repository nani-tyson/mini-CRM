// backend/jest.config.cjs
module.exports = {
    preset: '@shelf/jest-mongodb',
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
};