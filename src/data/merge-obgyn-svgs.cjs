const fs = require('fs');

function extractSvgs(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  // Match the body inside the exported object
  const match = content.match(/const\s+SVG_BATCH\d+\s*=\s*\{([\s\S]+?)\};\s*export\s+default/);
  if (match) {
    return match[1].trim();
  }
  return '';
}

let allSvgs = [];
for (let i = 1; i <= 3; i++) {
  const filename = `_obgyn-batch${i}.js`;
  if (fs.existsSync(filename)) {
    allSvgs.push(extractSvgs(filename));
  }
}

const joinedSvgs = allSvgs.join(',\n');

let target = fs.readFileSync('topic-svgs-mbbs.js', 'utf8');
target = target.replace(/\n\s*\};\s*$/, ',\n' + joinedSvgs + '\n};\n');

fs.writeFileSync('topic-svgs-mbbs.js', target);
console.log('Successfully merged OB/GYN SVGs into topic-svgs-mbbs.js');
