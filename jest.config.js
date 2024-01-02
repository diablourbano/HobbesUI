module.exports = {
  preset: 'react-native',
  testMatch: ['<rootDir>/src/**/tests/*.test.(js|ts|jsx|tsx)'],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
