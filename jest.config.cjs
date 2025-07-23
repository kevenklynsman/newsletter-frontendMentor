module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.(ts|tsx)"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json"
    }
  }
};