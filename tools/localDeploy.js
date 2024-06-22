const fs = require("fs");

const NAME = process.env.npm_package_name;
const DIR = `${process.env.LOCALAPPDATA}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/${NAME}/`;

//mkdir
fs.mkdirSync(DIR, { recursive: true }, (err) => { if (err) throw err; });

// copy files
fs.cpSync(`behavior_pack/manifest.json`, `${DIR}/manifest.json`);
fs.cpSync(`behavior_pack/pack_icon.png`, `${DIR}/pack_icon.png`);
fs.cpSync(`src_out/`, `${DIR}/scripts/`, { recursive: true });
