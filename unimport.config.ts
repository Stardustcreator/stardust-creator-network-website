// Unimport configuration for detecting unused imports
// Note: This is a placeholder config. The unimport tool may need different configuration
// based on its actual API. Remove this file if unimport doesn't support this format.

export default {
  // Scan for unused imports in these directories
  dirs: ['src'],

  // File extensions to check
  extensions: ['.ts', '.tsx', '.js', '.jsx'],

  // Ignore patterns
  ignore: ['node_modules', '.next', 'dist', 'build', '**/*.d.ts', '**/*.config.*'],
};
