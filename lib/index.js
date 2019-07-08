const fs = require('fs');
const path = require('path');
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
        { abstracts: ['_mixins', '_variables'] },
        { base: ['_fonts', '_reset', '_typography'] },
        { components: ['_buttons'] },
        { layout: ['_header', '_footer', '_navigation'] },
        { pages: ['_home'] },
        { themes: ['_theme'] },
        { vendors: [] },
    ],
    entry: 'main.scss',
};

const frontendGenerator = {
    init() {
        frontendGenerator.getProjectName();
    },
    getProjectName() {
        if (process.argv[3]) {
            projectName = process.argv[3];
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
        let styleDirName = '';
        let styleImports = '';

        function createSCSS(directory, array) {
            array.forEach((element) => {
                fs.writeFileSync(
                    `${projectName}/${baseDir}/assets/styles/${directory}/${element}.scss`,
                    '',
                );
                styleImports += `@import '${directory}/${element}'; \n`;
            });
            styleImports += '\n';
        }

        try {
            styles.base.forEach((element, index) => {
                styleDirName = Object.keys(element);
                fs.mkdirSync(`${projectName}/${baseDir}/assets/styles/${styleDirName[0]}`);
                createSCSS(styleDirName[0], styles.base[index][styleDirName]);
            });
            fs.writeFileSync(
                `${projectName}/${baseDir}/assets/styles/${styles.entry}`,
                `${styleImports}`,
            );
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
    createModule(moduleName) {
        const capitalize = (s) => {
            if (typeof s !== 'string') {
                return '';
            } else {
                return s.charAt(0).toUpperCase() + s.slice(1);
            }
        };
        const module = moduleName;
        const moduleDir = capitalize(moduleName);
        if (fs.existsSync(`src/assets/scripts/${moduleDir}`)) {
            console.log('Module Exist');
        } else {
            fs.mkdirSync(`src/assets/scripts/${moduleDir}`);
            fs.writeFileSync(`src/assets/scripts/${moduleDir}/${module}.js`, '');
            fs.writeFileSync(`src/assets/styles/pages/${module}.scss`, '');
            fs.writeFileSync(`src/views/${module}.html`, '');
        }
    },
};

exports.init = frontendGenerator;
