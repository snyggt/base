import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import jestPlugin from 'eslint-plugin-jest'

export const defaultEsTsConfigs = [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	eslintConfigPrettier,
	eslintPluginPrettier,
].map(config => ({
	...config,
	files: ['**/*.ts', '**/*.tsx'],
}))

const ignoredFolders = [
	'dist',
	'.dist',
	'bin',
	'.bin',
	'cdk.out',
	'storybook-static',
	'.storybook',
	'.next',
]
export const defaultIgnoreDist = {
	ignores: ignoredFolders.flatMap(folder => [`**/${folder}/**`, folder]),
}

export const defaultTsLanguageConfig = {
	files: ['**/*.ts', '**/*.tsx'],
	plugins: {
		'@typescript-eslint': tseslint.plugin,
		jest: jestPlugin,
	},
	languageOptions: {
		parserOptions: {
			projectService: { allowDefaultProject: ['*.js', '*.mjs'] },
			ecmaFeatures: {
				jsx: true,
			},
			allowImportExportEverywhere: true,
		},
		ecmaVersion: 2022,
		sourceType: 'module',
		globals: {
			node: true,
			commonjs: true,
			es6: true,
			browser: true,
			jest: true,
		},
	},
}

export const defaultJsLanguageConfig = {
	files: ['**/*.js'],
	languageOptions: {
		parserOptions: {
			allowImportExportEverywhere: true,
		},
		sourceType: 'commonjs',
		globals: {
			node: true,
			commonjs: true,
			browser: true,
			jest: true,
		},
	},
}

const defaultOverrideRules = {
	'@typescript-eslint/no-unsafe-call': 'off',
	'@typescript-eslint/no-unsafe-member-access': 'off',
	'@typescript-eslint/no-unsafe-assignment': 'off',
	'@typescript-eslint/no-unsafe-argument': 'off',
	'@typescript-eslint/no-explicit-any': 'error',
	'@typescript-eslint/no-empty-function': [
		'error',
		{ allow: ['functions', 'arrowFunctions'] },
	],

	'@typescript-eslint/no-unused-vars': [
		'error',
		{
			args: 'all',
			argsIgnorePattern: '^_',
			caughtErrors: 'all',
			caughtErrorsIgnorePattern: '^_',
			destructuredArrayIgnorePattern: '^_',
			varsIgnorePattern: '^_',
			ignoreRestSiblings: true,
		},
	],
	'@/quotes': [
		'error',
		'single',
		{ allowTemplateLiterals: false, avoidEscape: true },
	],
	'no-unsafe-negation': 'off',
	'no-var': 'error',
	'prefer-const': 'error',
	'prefer-rest-params': 'error',
	'prefer-spread': 'error',
}

export const defaultRuleOverrides = {
	files: ['**/*.ts', '**/*.tsx'],
	rules: defaultOverrideRules,
}

export const defaultDisableTypecheckOnJs = {
	...tseslint.configs.disableTypeChecked,
	files: ['**/*.js', '**/*.mjs'],
	rules: { ...tseslint.configs.disableTypeChecked.rules },
}

export const defaultJestRules = {
	...jestPlugin.configs['flat/recommended'],
	files: ['test/*.test.ts', '**/*.test.ts', 'test/*.test.tsx', '**/*.test.tsx'],
	rules: {
		...jestPlugin.configs['flat/recommended'].rules,
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-require-imports': 'off',
	},
}

export default tseslint.config(
	defaultIgnoreDist,
	...defaultEsTsConfigs,
	defaultJsLanguageConfig,
	defaultTsLanguageConfig,
	defaultRuleOverrides,
	defaultDisableTypecheckOnJs,
	defaultJestRules,
)
