<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/sinnerschrader/patternplate-client/next/patternplate.svg" />
  </a>
</div>
<h1 align="center">☸ patternplate-client development</h1>

> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]
[![Build status][ci-image]][ci-url] [![Coverage][coverage-image]][coverage-url]

You dig patternplate-client and want to submit a pull request? Awesome!
Be sure to read the [contribution guide](./contributing.md) and you should be good to go.
Here are some notes to get you coding real quick.

### Prerequesites
For development for patternplate-client you'll need:
* git
* node/io `>=3`
* npm `>=2`

### Getting started
Fetch, install and start the default watch task
```
git clone https://github.com/sinnerschrader/patternplate-client.git
cd patternplate-client
npm install
npm run build
npm start
```
This will watch all files in `source` and start the appropriate tasks when changes are detected.

### Build system
patternplate-client is written using ES6 and ES7 features and transpiled to ES5 compatible code.

* All js sources are kept in `source` and built to `distribution/`.
  **NOTE** `distribution/` is ignored from SCM and only included when releasing to npm
* Documentation templates are kept in `source` with an extension of `.mjs` and built to `.`
* [fly](https://github.com/fly/flyjs) is used as task manager. List available tasks via `npm start -- --list`
* A [.editorconfig](.editorconfig) is provided. Make sure to use the applicable plugin for your editor.
* A [.eslintrc](.eslintrc) is provided. The default build will fail when linting fails. To make your life easier you can install the eslint plugin applicable for your editor.
* patternplate-client uses commitizen to make adherence to the [commit rules](../contributing.md#commit-rules) easier. Use `npm run commit` to commit changes.
* All dependencies are pinned to specific versions and managed via [greenkeeper](/greenkeeperio/greenkeeper).
* [package.json](../package.json) does not include a version field. Releases to npm are managed via [semantic-release](/semantic-release/semantic-release)

---
patternplate-client is built by SinnerSchrader and [contributors](./contributors.md) with :heart:
and released under the [MIT License](./license.md).

[npm-url]: https://www.npmjs.org/package/patternplate-client
[npm-image]: https://img.shields.io/npm/v/patternplate-client.svg?style=flat-square
[npm-dl-image]: http://img.shields.io/npm/dm/patternplate-client.svg?style=flat-square

[ci-url]: https://travis-ci.org/sinnerschrader/patternplate-client
[ci-image]: https://img.shields.io/travis/sinnerschrader/patternplate-client.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/sinnerschrader/patternplate-client
[coverage-image]: https://img.shields.io/coveralls/sinnerschrader/patternplate-client.svg?style=flat-square
