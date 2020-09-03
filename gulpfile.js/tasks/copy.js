'use strict';

const { paths: { source, vendor, destination } } = require('../paths');
const { src, dest } = require('gulp');

const copy = () => {
  src(vendor.styles)
    .pipe(dest(`${destination.styles}libs/`));
  src(vendor.scripts)
    .pipe(dest(destination.scripts));
  return src(`${source.root}favicon.ico`)
    .pipe(dest(destination.root));
};

module.exports = copy;
