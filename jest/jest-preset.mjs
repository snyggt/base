export default {
	testEnvironment: 'node',
	transform: { '^.+\\.tsx?$': ['ts-jest', {}] },
	modulePaths: ['src', 'src/lib'],
	testPathIgnorePatterns: [
		'<rootDir>/.next/',
		'<rootDir>/dist/',
		'<rootDir>/node_modules/',
		'<rootDir>/node_modules/.pnpm',
	],
	prettierPath: null,
}
