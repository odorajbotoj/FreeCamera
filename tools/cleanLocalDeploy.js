const rimraf = require("rimraf");

const NAME = process.env.npm_package_name;
const DIR = `${process.env.LOCALAPPDATA}/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/${NAME}/`;

// clean
rimraf.rimrafSync(DIR);
