const es = Object.keys(require('./src/i18n/es.json'));
const en = Object.keys(require('./src/i18n/en.json'));
const { difference } = require('ramda');
const chalk = require('chalk');

const diffKeysEs = difference(es, en);
const diffKeysEn = difference(en, es);
if (diffKeysEs.length > 0 || diffKeysEn.length > 0) {
  console.log(chalk.blue('Hay diferencias en los archivos de traducción.'));
  console.log(chalk.blue('=============================================='));
  diffKeysEs.forEach((val) => {
    console.log(chalk.red(`Falta la clave "${val}" en el archivo en.json`));
  });
  diffKeysEn.forEach((val) => {
    console.log(chalk.red(`Falta la clave "${val}" en el archivo es.json`));
  });
  process.exit(1);
} else {
  console.log(
    chalk.green('No hay diferencias en los archivos de traducción, todo OK!')
  );
  process.exit(0);
}
