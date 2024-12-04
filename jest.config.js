/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  "reporters": [
	"default",
	["./node_modules/jest-html-reporter", {
		"pageTitle": "Test Report",
    "outputPath": "test-report/test-report.html"
	}]
]
};