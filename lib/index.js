const fs = require('fs');
const template = require('./templates');

const baseDir = 'src';
let projectName;

const files = [
    {
        name: 'webpack.config.js',
        file: template.webpackConfigs.getMainConfig(),
    },
    {
        name: 'webpack.dev.config.js',
        file: template.webpackConfigs.getDevConfig(),
    },
    {
        name: 'webpack.prod.config.js',
        file: template.webpackConfigs.getBuildConfig(),
    },
    {
        name: 'package.json',
        file: template.nodeModules.getModules(),
    },
    {
        name: '.eslintrc',
        file: template.esLint.getLinter(),
    },
    {
        name: '.eslintignore',
        file: template.esLint.getLintIgnore(),
    },
    {
        name: '.gitignore',
        file: template.gitIgnore.createGitIgnore(),
    },
];
const styles = {
    base: [
        'abstracts',
        'base',
        'components',
        'layout',
        'pages',
        'themes',
        'vendors',
    ],
    entry: 'main.scss',
};

function createBaseFiles() {
    let file;
    try {
        files.forEach((element) => {
            file = element.file;
            fs.writeFileSync(
                `${projectName}/${element.name}`,
                file,
            );
            file = undefined;
        });
    } catch (e) {
        console.log(e);
    }
}

function createStyles() {
    try {
        styles.base.forEach((element) => {
            fs.mkdirSync(`${projectName}/${baseDir}/assets/styles/${element}`);
        });
        fs.writeFileSync(`${projectName}/${baseDir}/assets/styles/${styles.entry}`);
    } catch (e) {
        console.log(e);
    }
}

function createHtml() {
    try {
        fs.mkdirSync(`${projectName}/${baseDir}/views`);
        fs.mkdirSync(`${projectName}/${baseDir}/views/partials`);
        fs.writeFileSync(`${projectName}/${baseDir}/views/home.html`, '');
        fs.writeFileSync(`${projectName}/${baseDir}/views/partials/_head.html`, template.htmlTemplates.getHead());
        fs.writeFileSync(`${projectName}/${baseDir}/views/partials/_navigation.html`, template.htmlTemplates.getNavigation());
        fs.writeFileSync(`${projectName}/${baseDir}/views/partials/_footer.html`, template.htmlTemplates.getFooter());
        fs.writeFileSync(`${projectName}/${baseDir}/index.html`, template.htmlTemplates.getSkeleton().toString());
    } catch (e) {
        console.log(e);
    }
}

function createBaseDirectory() {
    try {
        fs.mkdirSync(projectName);
        fs.mkdirSync(`${projectName}/${baseDir}`);
        fs.mkdirSync(`${projectName}/${baseDir}/assets`);
        fs.mkdirSync(`${projectName}/${baseDir}/assets/styles`);
        fs.mkdirSync(`${projectName}/${baseDir}/assets/scripts`);
        fs.mkdirSync(`${projectName}/${baseDir}/assets/images`);
        fs.mkdirSync(`${projectName}/${baseDir}/assets/fonts`);
        createBaseFiles();
        createHtml();
        createStyles();
    } catch (e) {
        if (e === 'EEXIST') {
            console.log('directory exist');
        } else {
            console.log(e);
        }
    }
};



const frontendGenerator = {
    init() {
        frontendGenerator.getProjectName();
    },
    getProjectName() {
        if (process.argv[2]) {
            projectName = process.argv[2];
            frontendGenerator.createBaseDirectories();
        } else {
            console.log('Please specify the project name');
        }
    },
    createBaseDirectories() {
        try {
            fs.mkdirSync(projectName);
            fs.mkdirSync(`${projectName}/${baseDir}`);
            fs.mkdirSync(`${projectName}/${baseDir}/assets`);
            fs.mkdirSync(`${projectName}/${baseDir}/assets/styles`);
            fs.mkdirSync(`${projectName}/${baseDir}/assets/scripts`);
            fs.mkdirSync(`${projectName}/${baseDir}/assets/images`);
            fs.mkdirSync(`${projectName}/${baseDir}/assets/fonts`);
            frontendGenerator.createBaseFiles();
            frontendGenerator.createHtml();
            frontendGenerator.createStyles();
            frontendGenerator.createScripts();
        } catch (e) {
            if (e === 'EEXIST') {
                console.log('directory exist');
            } else {
                console.log(e);
            }
        }
    },
    createBaseFiles() {
        let file;
        try {
            files.forEach((element) => {
                file = element.file;
                fs.writeFileSync(
                    `${projectName}/${element.name}`,
                    file,
                );
                file = undefined;
            });
        } catch (e) {
            console.log(e);
        }
    },
    createStyles() {
        try {
            styles.base.forEach((element) => {
                fs.mkdirSync(`${projectName}/${baseDir}/assets/styles/${element}`);
            });
            fs.writeFileSync(`${projectName}/${baseDir}/assets/styles/${styles.entry}`, '');
        } catch (e) {
            console.log(e);
        }
    },
    createScripts() {
        const imports = 'import \'../styles/main.scss\';';
        try {
            fs.writeFileSync(`${projectName}/${baseDir}/assets/scripts/app.js`, imports);
        } catch (e) {
            console.log(e);
        }
    },
    createHtml() {
        try {
            fs.mkdirSync(`${projectName}/${baseDir}/views`);
            fs.mkdirSync(`${projectName}/${baseDir}/views/partials`);
            fs.writeFileSync(`${projectName}/${baseDir}/views/home.html`, '');
            fs.writeFileSync(`${projectName}/${baseDir}/views/partials/_head.html`, template.htmlTemplates.getHead());
            fs.writeFileSync(`${projectName}/${baseDir}/views/partials/_navigation.html`, template.htmlTemplates.getNavigation());
            fs.writeFileSync(`${projectName}/${baseDir}/views/partials/_footer.html`, template.htmlTemplates.getFooter());
            fs.writeFileSync(`${projectName}/${baseDir}/index.html`, template.htmlTemplates.getSkeleton().toString());
        } catch (e) {
            console.log(e);
        }
    },
};

exports.init = frontendGenerator;
