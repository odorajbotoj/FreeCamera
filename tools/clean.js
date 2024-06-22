const rimraf = require("rimraf");
const path = require("path");

const DEFAULT_CLEAN_DIRECTORIES = ['build', 'src_out'];

for (var dir in DEFAULT_CLEAN_DIRECTORIES) {
    rimraf.rimrafSync(path.resolve(process.cwd(), dir));
}