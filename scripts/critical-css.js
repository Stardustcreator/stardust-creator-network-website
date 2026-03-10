const critical = require('critical');
const fs = require('fs');
const path = require('path');

const PATHS = [
  { url: 'https://stardustcreators.com', output: 'home-critical.css' },
  { url: 'https://stardustcreators.com/blog', output: 'blog-critical.css' },
  { url: 'https://stardustcreators.com/creators', output: 'creators-critical.css' }
];

PATHS.forEach(async (page) => {
  try {
    const { css } = await critical.generate({
      inline: false,
      base: './public/',
      src: page.url,
      target: {
        css: path.join(__dirname, '..', 'public', 'critical', page.output)
      },
      dimensions: [
        { width: 375, height: 667 },  // Mobile
        { width: 1920, height: 1080 } // Desktop
      ],
      extract: true,
      minify: true,
      width: 1920,
      height: 1080,
    });

    console.log(`Critical CSS generated for ${page.url}`);
  } catch (error) {
    console.error('Critical CSS generation error:', error);
  }
});