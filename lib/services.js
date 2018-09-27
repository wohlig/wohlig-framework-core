global.services = require('require-all')({
    dirname: pwd + "/services",
    excludeDirs: /^\.(git|svn)$/,
    recursive: true,
    map: (name) => {
        return name + "Service";
    }
});