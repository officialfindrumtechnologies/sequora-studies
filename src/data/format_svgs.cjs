const fs = require('fs');
let content = fs.readFileSync('/Volumes/DevWorkspace/Sequora-studies/sequora/src/data/_paeds-batch3.js', 'utf8');

// Replace > with >\n to make it multi-line
content = content.replace(/><\/svg>/g, '>\n</svg>');
content = content.replace(/><rect/g, '>\n  <rect');
content = content.replace(/><circle/g, '>\n  <circle');
content = content.replace(/><ellipse/g, '>\n  <ellipse');
content = content.replace(/><polygon/g, '>\n  <polygon');
content = content.replace(/><path/g, '>\n  <path');
content = content.replace(/><line/g, '>\n  <line');
content = content.replace(/><text/g, '>\n  <text');

fs.writeFileSync('/Volumes/DevWorkspace/Sequora-studies/sequora/src/data/_paeds-batch3.js', content);
console.log('Formatted.');
