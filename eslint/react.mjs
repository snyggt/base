import nodeBase, { defaultRuleOverrides } from './node.mjs'
import tseslint from 'typescript-eslint'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'

export const defaultReactLint = {
	files: ['**/*.ts', '**/*.tsx'],
	plugins: {
		'react-hooks': pluginReactHooks,
	},
	rules: {
		...pluginReactHooks.configs.recommended.rules,
		...defaultRuleOverrides.rules,
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
	},
}

export const defaultReactPlugin = {
	files: ['**/*.ts', '**/*.tsx'],
	plugins: {
		react: reactPlugin,
	},
	rules: {
		...reactPlugin.configs['jsx-runtime'].rules,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}

export default tseslint.config(
	...nodeBase,
	defaultReactLint,
	defaultReactPlugin
)
