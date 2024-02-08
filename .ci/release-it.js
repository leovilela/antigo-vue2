const { version } = require('../package.json')
const { exec } = require('child_process');

console.log(`Version ${version}`);

exec(`git tag v${version} && git push --tags`, (err, stdout, stderr) => {
  if (err) {
    console.log(`Error in  generate git tag v${version} ${stderr}`);
    return
  }
  console.log(stdout);
})

