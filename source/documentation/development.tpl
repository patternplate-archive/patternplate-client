<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/${props.pkg.repository.slug}/next/patternplate.svg" />
  </a>
</div>
<h1 align="center">☸ ${props.pkg.name} development</h1>

> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]
[![Build status][ci-image]][ci-url] [![Coverage][coverage-image]][coverage-url]

You dig ${props.pkg.name} and want to submit a pull request? Awesome!
Be sure to read the [contribution guide](./contributing.md) and you should be good to go.
Here are some notes to get you coding real quick.

### Prerequesites
For development for ${props.pkg.name} you'll need:
* **All systems**: git
* **Windows**: node/io `<%- props.appveyor.environment.matrix.map(function(entry){ return entry.nodejs_version; }).join(', ') %>`
* **Unix(ish)**: node/io `<%- props.travis.node_js.join(', ') %>`

### Getting started
Fetch, install and start the default watch task
```
git clone ${props.pkg.repository.url}
cd ${props.pkg.name}
npm install
npm run build
npm start
```
This will watch all files in `source` and start the appropriate tasks when changes are detected.

### Build system
${props.pkg.name} is written using ES6 and ES7 features and transpiled to ES5 compatible code.

* All js sources are kept in `source` and built to `distribution/`.
  **NOTE** `distribution/` is ignored from SCM and only included when releasing to npm
* Documentation templates are kept in `source` with an extension of `.tpl` and built to `.`
* gulp is used as task manager. List available tasks via `npm run gulp help`
* A [.editorconfig](.editorconfig) is provided. Make sure to use the applicable plugin for your editor.
* A [.eslintrc](.eslintrc) is provided. The default build will fail when linting fails. To make your life easier you can install the eslint plugin applicable for your editor.
* ${props.pkg.name} uses commitizen to make adherence to the [commit rules](../contributing.md#commit-rules) easier. Use `npm run commit` to commit changes.
* All dependencies are pinned to specific versions and managed via [greenkeeper](/greenkeeperio/greenkeeper).
* [package.json](../package.json) does not include a version field. Releases to npm are managed via [semantic-release](/semantic-release/semantic-release)

---
${props.pkg.name} is built by ${props.pkg.author.name} and [contributors](./contributors.md) with :heart:
and released under the [MIT License](./license.md).

[npm-url]: https://www.npmjs.org/package/${props.pkg.name}
[npm-image]: https://img.shields.io/npm/v/${props.pkg.name}.svg?style=flat-square
[npm-dl-image]: http://img.shields.io/npm/dm/${props.pkg.name}.svg?style=flat-square

[ci-url]: https://travis-ci.org/${props.pkg.repository.slug}
[ci-image]: https://img.shields.io/travis/${props.pkg.repository.slug}.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/${props.pkg.repository.slug}
[coverage-image]: https://img.shields.io/coveralls/${props.pkg.repository.slug}.svg?style=flat-square
