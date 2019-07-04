const fs = require('fs');
const template = require('./templates');
const baseDir = 'src';

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
            fs.writeFileSync(element.name, file);
            file = undefined;
        });
    } catch (e) {
        console.log(e);
    }
}

function createStyles() {
    try {
        styles.base.forEach((element) => {
            fs.mkdirSync(`src/assets/styles/${element}`);
        });
        fs.writeFileSync(`src/assets/styles/${styles.entry}`);
    } catch (e) {
        console.log(e);
    }
}

function createHtml() {
    try {
        fs.mkdirSync(`${baseDir}/views`);
        fs.mkdirSync(`${baseDir}/views/partials`);
        fs.writeFileSync(`${baseDir}/views/home.html`, '');
        fs.writeFileSync(`${baseDir}/views/partials/_head.html`, template.htmlTemplates.getHead());
        fs.writeFileSync(`${baseDir}/views/partials/_navigation.html`, template.htmlTemplates.getNavigation());
        fs.writeFileSync(`${baseDir}/views/partials/_footer.html`, template.htmlTemplates.getFooter());
        fs.writeFileSync(`${baseDir}/index.html`, template.htmlTemplates.getSkeleton().toString());
    } catch (e) {
        console.log(e);
    }
}

function createBaseDirectory() {
    try {
        fs.mkdirSync(baseDir);
        fs.mkdirSync(`${baseDir}/assets`);
        fs.mkdirSync(`${baseDir}/assets/styles`);
        fs.mkdirSync(`${baseDir}/assets/scripts`);
        fs.mkdirSync(`${baseDir}/assets/images`);
        fs.mkdirSync(`${baseDir}/assets/fonts`);
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
}

createBaseDirectory();
