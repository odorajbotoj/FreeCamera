# mcbe-sapi-ts-template

MinecraftBE ScriptAPI Typescript project template

## Usage

+ Run `npm i` to install packages
+ Edit `behavior_pack/manifest.json`
+ Edit `package.json`
+ Change `behavior_pack/pack_icon.png`
+ Write Typescript scripts in `scripts/`
+ Write `CHANGELOG.md`
+ Run `npm run pack` to build the `mcpack`

## Commands

+ `npm run clean` to clean the workspace
+ `npm run build` to build the typescript scripts
+ `npm run cleanLocalDeploy` to remove the pack in `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs`
+ `npm run localDeploy` to generate the pack in `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs`
+ `npm run pack` to generate the mcpack

## License

+ CC0-1.0 License
