module.exports = {
	extends: [
	  'eslint:recommended',
	  'plugin:vue/vue3-recommended',
	  'prettier',
	],
	plugins: [
	  'vue',
	  'prettier',
	],
	rules: {
	  'prettier/prettier': ['error', {
		'semi': false,          // 세미콜론 사용 여부
		'singleQuote': true,    // 작은따옴표 사용
		'tabWidth': 2,          // 탭 너비
		'useTabs': false,       // 탭 대신 스페이스 사용
		'printWidth': 120,      // 줄 길이
		'trailingComma': 'all', // 끝에 쉼표 추가
	  }],
	  'vue/multi-word-component-names': 'off',  // 컴포넌트 이름 규칙 무시 (필요한 경우)
	},
  }
  