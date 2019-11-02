'use strict';

const argv = require('yargs')
  .option('oh-host', {
    alias: 'h',
    describe: 'openHAB Cloud host',
    type: 'string',
    demandOption: true
  })
  .option('oh-port', {
    describe: 'openHAB Cloud port',
    type: 'number',
    default: 443
  })
  .option('oh-path', {
    describe: 'openHAB Cloud path',
    type: 'string',
    default: '/rest/items/'
  })
  .option('port', {
    describe: 'Local listening port',
    type: 'number',
    default: 3000
  })
  .help()
  .argv;

const gaConfig = require('openhab.google-assistant-smarthome.cloud-function/config');
gaConfig.host = argv.ohHost;
gaConfig.port = argv.ohPort;
gaConfig.path = argv.ohPath;

const ga = require('openhab.google-assistant-smarthome.cloud-function');

const express = require('express');
const bodyParser = require('body-parser');
const app = express()
  .use(bodyParser.json())
  .use('/', ga.openhabGoogleAssistant);

app.listen(argv.port, () => {
  console.log(`Server is listening on port ${argv.port}`);
});
