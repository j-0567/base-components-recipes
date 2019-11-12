const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');
module.exports = {
    ...jestConfig,
    moduleNameMapper: {
        '^lightning/configProvider$':
            '<rootDir>/force-app/test/jest-mocks/lightning/configProvider/configProvider'
    },
    setupFiles: ['jest-canvas-mock']
};
