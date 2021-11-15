const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach((element) => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

function copyReadme() {
    const readmePath = 'README.md';
    const destinationFolder = 'dist/ngx-os';

    fs.copyFileSync(readmePath, `${destinationFolder}/${readmePath}`);
}

copyFolderSync(
    'src/assets/themes',
    'dist/ngx-os/assets/themes'
);
copyReadme();
