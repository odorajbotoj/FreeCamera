const fs = require("fs");
const archiver = require("archiver");
const rimraf = require("rimraf");

const NAME = process.env.npm_package_name;

fs.mkdirSync(`build/${NAME}/`, { recursive: true }, (err) => { if (err) throw err; });

// copy files
fs.cpSync(`behavior_pack/manifest.json`, `build/${NAME}/manifest.json`);
fs.cpSync(`behavior_pack/pack_icon.png`, `build/${NAME}/pack_icon.png`);
fs.cpSync(`src_out/`, `build/${NAME}/`, { recursive: true });

// archive
const output = fs.createWriteStream(`build/${NAME}-bp.mcpack`);
const archive = archiver("zip");
archive.on("error", (err) => { throw err; });
archive.pipe(output);
archive.directory(`build/${NAME}/`, `${NAME}`);
archive.finalize();
