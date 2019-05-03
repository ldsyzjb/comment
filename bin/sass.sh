#!/usr/bin/sh

Program=./node_modules/node-sass/bin/node-sass

${Program} extension/css/popup.scss extension/css/popup.css
${Program} extension/css/content.scss extension/src/content.css