const fs = require('fs');
const path = require('path');

const root = path.join(process.cwd(), 'src', 'features');
const subdirs = ['api', 'components', 'hooks', 'pages', 'schemas', 'services', 'types'];

for (const feature of fs.readdirSync(root, { withFileTypes: true })) {
  if (!feature.isDirectory()) continue;

  const featureDir = path.join(root, feature.name);
  for (const sub of subdirs) {
    const target = path.join(featureDir, sub);
    if (!fs.existsSync(target)) continue;

    const files = fs.readdirSync(target).filter((file) => {
      const fullPath = path.join(target, file);
      return fs.statSync(fullPath).isFile() && file !== 'index.ts' && !file.endsWith('.d.ts') && !file.startsWith('.');
    });

    const content = files.length
      ? files.map((file) => `export * from './${path.basename(file, path.extname(file))}';`).join('\n') + '\n'
      : 'export {};\n';

    fs.writeFileSync(path.join(target, 'index.ts'), content, 'utf8');
  }
}
