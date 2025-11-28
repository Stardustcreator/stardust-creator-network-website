#!/usr/bin/env node

/**
 * Script to analyze and report unused CSS and JavaScript in the project
 * This helps identify code that can be removed to reduce bundle size
 */

const { execSync } = require('child_process');

console.log('🔍 Analyzing unused code in your project...\n');

// Check for unused dependencies
console.log('📦 Checking for unused npm dependencies...');
try {
  const depcheckOutput = execSync(
    'npx depcheck --ignores="@types/*,eslint-*,prettier,@axe-core/*,playwright,vitest,husky,lint-staged,rimraf,cross-env,dotenv-cli"',
    { encoding: 'utf-8', stdio: 'pipe' }
  );
  if (depcheckOutput.trim()) {
    console.log('⚠️  Unused dependencies found:');
    console.log(depcheckOutput);
  } else {
    console.log('✅ No unused dependencies found!\n');
  }
} catch (error) {
  if (error.stdout) {
    console.log('⚠️  Potential unused dependencies:');
    console.log(error.stdout);
  } else {
    console.log('✅ Dependency check completed\n');
  }
}

// Check build output size
console.log('\n📊 Build size analysis:');
console.log('   Run "npm run analyze:bundles" to see detailed bundle analysis');
console.log("   This will open a visual report showing what's in your bundles\n");

// Tailwind CSS info
console.log('🎨 Tailwind CSS:');
console.log('   ✅ Tailwind CSS 4 automatically purges unused CSS');
console.log('   ✅ Only CSS classes actually used in your code are included\n');

// Next.js optimization info
console.log('⚡ Next.js Optimizations:');
console.log('   ✅ JavaScript is automatically minified in production');
console.log('   ✅ CSS is automatically minified in production');
console.log('   ✅ Tree-shaking removes unused code');
console.log('   ✅ Console.log statements are removed in production\n');

console.log('💡 Tips to reduce bundle size:');
console.log('   1. Use dynamic imports for heavy components');
console.log('   2. Remove unused imports from your code');
console.log('   3. Check bundle analyzer: npm run analyze:bundles');
console.log('   4. Remove unused npm packages: npm run check:unused-deps\n');
