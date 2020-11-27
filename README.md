# :movie_camera: Project «Accio Movie» with [The Movie Db API](https://www.themoviedb.org/documentation/api)

[![Build status][travis-image]][travis-url] [![Dependency status][dependency-image]][dependency-url]

Code by: [Rostyslav Miniukov](https://github.com/embyth/)

[Project Demo](https://embyth.github.io/accio-movie/)

---

## Usage

`npm install` - install dependencies.

`npm start` - building project in dev mode and launching local server.

`npm run build` - building project.

`npm run deploy` - building project and deploying it on [GitHub Pages](https://pages.github.com).

`npm run dist` - building project and archieving it in zip.

`npm test` - launching linting test.

---

## Project Structure

```bash
.
├── gulp/      # Gulp tasks directory
├── build/            # Project build directory (created automatically)
├── dist/             # Directory in which the assembled project is archived (created automatically)
├── source/           # Directory for placing project source files
│   ├── fonts/        # Fonts directory
│   ├── img/          # Images directory
│   │   └── content/  # content images directory for converting to webp format
│   │   └── icons/    # vector images directory for generating svg sprite
│   ├── js/           # JavaScript directory
│   ├── sass/         # Styles directory
│   └── index.html    # Page mark-up file
├── .babelrc          # Babel config
├── .browserconfig    # Browser list config
├── .editorconfig     # Editor config
├── .eslintrc         # ESLint config
├── .eslintignore     # ESLint ignore file
├── .gitattributes    # Git attributes file
├── .gitignore        # Git ignore file
├── .travis.yml       # Travis CI config
├── .npmrc            # npm config
├── .stylelintrc.json # StyleLint config file       
├── package.json      # npm dependencies and project settings file
├── package-lock.json # npm lock-file
├── gulpfile.js       # gulp config file
├── webpack.config.js # webpack config file
└── README.md         # Project documents
```

[travis-image]: https://travis-ci.org/embyth/accio-movie.svg?branch=master
[travis-url]: https://travis-ci.org/embyth/accio-movie
[dependency-image]: https://david-dm.org/embyth/accio-movie/dev-status.svg?style=flat-square
[dependency-url]: https://david-dm.org/embyth/accio-movie?type=dev
