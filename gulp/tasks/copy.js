import {paths} from '../paths.js';
import pkg from 'gulp';

const {vendor, destination, source} = paths;
const {src, dest} = pkg;

export const copy = () => {
  src(vendor.styles)
    .pipe(dest(`${destination.styles}libs/`));
  return src(`${source.root}/*.ico`)
    .pipe(dest(destination.root));
}

