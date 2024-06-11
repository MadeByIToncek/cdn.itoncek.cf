const { resolve } = require('path'), { readdir } = require('fs').promises;

async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

const directory = "./";

getFiles(directory).then(results => {
    const html = `<ul>` +
        results.map(fileOrDirectory => {
            if (!fileOrDirectory.toString().includes(".git")) {
                return `<li>${fileOrDirectory.toString().replace("I:\\#itoncek\\#netlify\\cdn\\","")}</li>\n`
            }
        }).join('') +
        `</ul>`;

    process.stdout.write(html);
    // or you could use something like fs.writeFile to write the file directly
});