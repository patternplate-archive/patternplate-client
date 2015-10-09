<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/${props.pkg.repository.slug}/master/patternplate.svg" />
  </a>
</div>
<h1 align="center">☸ ${props.pkg.name}</h1>
<p align="center">
  <b><a href="#about">About</a></b> | <b><a href="#usage">Usage</a></b> | <b><a href="./documentation/readme.md">Documentation</a></b> | <b><a href="./documentation/contributing.md">Contributing</a></b>
</p>
<br />
> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]
[![Build status][ci-image]][ci-url] [![Coverage][coverage-image]][coverage-url]

> Activity

[![Pull requests][pr-image]][pr-url] [![Issues][issue-image]][issue-url]

> Standards

[![Commitizen friendly][commitizen-image]][commitizen-url] [![Build system][buildsystem-image]][buildsystem-url] [![Dependency management][dependency-manager-image]][dependency-manager-url] [![Release management][release-manager-image]][release-manager-url]
![Ecmascript version][ecma-image] [![Javascript coding style][codestyle-image]][codestyle-url] [![License][license-image]][license-url]

> Reach out

[![chat with patternplate][gitter-image]][gitter-url]

## About
${props.pkg.name} contains shared functionality of all [patternplate](/sinnerschrader/patternplate/) projects. Its primary task is traversal and comprehension of pattern trees.

## Install
[${props.pkg.name}](npm-url) is available on npm.
```
npm install --save ${props.pkg.name}
```

## Usage
### CLI
${props.pkg.name} exposes a CLI. Documentation will follow in short notice.

### API
${props.pkg.name} exposes its API as commonjs module. Functionalities are grouped in namespaces.
See [API Documentation](./documentation/api.md) for details.

```js
import patternplateClient from '${props.pkg.name}';
const client = await patternplateClient();
```

## Development
You dig ${props.pkg.name} and want to submit a pull request? Awesome!
Be sure to read the [contribution guide](./contributing.md) and you should be good to go.
Here are some notes to get you coding real quick.

Fetch, install and start the default watch task
```
git clone ${props.pkg.repository.url}
cd ${props.pkg.name}
npm install
npm start
```
This will watch all files in `source` and start the appropriate tasks when changes are detected.
See [development](./documentation/development.md) for more details.

---
${props.pkg.name} is built by ${props.pkg.author.name} and [contributors](./documentation/contributors.md) with :heart:
and released under the [MIT License](./license.md).

[npm-url]: https://www.npmjs.org/package/${props.pkg.name}
[npm-image]: https://img.shields.io/npm/v/${props.pkg.name}.svg?style=flat-square
[npm-dl-image]: http://img.shields.io/npm/dm/${props.pkg.name}.svg?style=flat-square

[ci-url]: https://travis-ci.org/${props.pkg.repository.slug}
[ci-image]: https://img.shields.io/travis/${props.pkg.repository.slug}.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/${props.pkg.repository.slug}
[coverage-image]: https://img.shields.io/coveralls/${props.pkg.repository.slug}.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/${props.pkg.repository.slug}
[climate-image]: https://img.shields.io/codeclimate/github/${props.pkg.repository.slug}.svg?style=flat-square

[pr-url]: http://issuestats.com/github/${props.pkg.repository.slug}
[pr-image]: http://issuestats.com/github/${props.pkg.repository.slug}/badge/pr?style=flat-square
[issue-url]: ${props.pkg.bugs.url}
[issue-image]: http://issuestats.com/github/${props.pkg.bugs.slug}/badge/issue?style=flat-square

[buildsystem-image]: https://img.shields.io/badge/builds%20with-fly-3989c9.svg?style=flat-square
[buildsystem-url]: https://github.com/flyjs/fly
[dependency-manager-image]: https://img.shields.io/badge/tracks%20with-greenkeeper-3989c9.svg?style=flat-square
[dependency-manager-url]: https://github.com/greenkeeperio/greenkeeper
[release-manager-image]: https://img.shields.io/badge/releases%20with-semantic--release-3989c9.svg?style=flat-square
[release-manager-url]: https://github.com/semantic-release/semantic-release
[buildsystem-url]: https://github.com/flyjs/fly
[ecma-image]: https://img.shields.io/badge/babel%20stage-0-3989c9.svg?style=flat-square
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-xo-3989c9.svg?style=flat-square
[license-url]: ./license.md
[license-image]: https://img.shields.io/badge/license-MIT-3989c9.svg?style=flat-square
[commitizen-url]: http://commitizen.github.io/cz-cli/
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-3989c9.svg?style=flat-square

[gitter-image]: https://img.shields.io/badge/gitter-join%20chat-3989c9.svg?style=flat-square
[gitter-url]: https://gitter.im/sinnerschrader/patternplate

[patternplate-url]: /sinnerschrader/patternplate
