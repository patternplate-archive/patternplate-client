<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/sinnerschrader/patternplate-client/next/patternplate.svg" />
  </a>
</div>
<h1 align="center">☸ patternplate-client</h1>
<p align="center">
  <b><a href="#about">About</a></b> | <b><a href="#usage">Usage</a></b> | <b><a href="./documentation/readme.md">Documentation</a></b> | <b><a href="./contributing.md">Contributing</a></b>
</p>
<br />
> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]

[![Unix build status][ci-image]][ci-url] [![Windows build status][appveyor-image]][appveyor-url]

[![Coverage][coverage-image]][coverage-url] [![Code Quality][climate-image]][climate-url]

> Activity

[![Pull requests][pr-image]][pr-url] [![Issues][issue-image]][issue-url]

> Standards

[![Commitizen friendly][commitizen-image]][commitizen-url] [![Dependency management][dependency-manager-image]][dependency-manager-url] [![Release management][release-manager-image]][release-manager-url]
![Ecmascript version][ecma-image] [![Javascript coding style][codestyle-image]][codestyle-url] [![License][license-image]][license-url]

> Reach out

[![chat with patternplate][gitter-image]][gitter-url]

## About
patternplate-client is the client application for [patternplate][patternplate-url].

## Install
[patternplate-client](npm-url) is available on npm.
```
npm install --save patternplate-client
```

## Usage
### CLI
patternplate-client exposes a CLI. Documentation will follow in short notice.

### API
patternplate-client exposes its API as commonjs module. Functionalities are grouped in namespaces.
See [API Documentation](./documentation/api.md) for details.

```js
import patternplateClient from 'patternplate-client';
const client = await patternplateClient();
```

## Development
You dig patternplate-client and want to submit a pull request? Awesome!
Be sure to read the [contribution guide](./contributing.md) and you should be good to go.
Here are some notes to get you coding real quick.

Fetch, install and start the default watch task
```
git clone https://github.com/sinnerschrader/patternplate-client.git
cd patternplate-client
npm install
npm start
```
This will watch all files in `source` and start the appropriate tasks when changes are detected.
See [development](./documentation/development.md) for more details.

---
patternplate-client is built by SinnerSchrader and [contributors](./documentation/contributors.md) with :heart:
and released under the [MIT License](./license.md).

[npm-url]: https://www.npmjs.org/package/patternplate-client
[npm-image]: https://img.shields.io/npm/v/patternplate-client.svg?style=flat-square
[npm-dl-image]: http://img.shields.io/npm/dm/patternplate-client.svg?style=flat-square

[ci-url]: https://travis-ci.org/sinnerschrader/patternplate-client
[ci-image]: https://img.shields.io/travis/sinnerschrader/patternplate-client/next.svg?style=flat-square
[appveyor-url]: https://ci.appveyor.com/project/sinnerschrader/patternplate-client
[appveyor-image]: https://img.shields.io/appveyor/ci/sinnerschrader/patternplate-client/next.svg?style=flat-square

[coverage-url]: https://coveralls.io/r/sinnerschrader/patternplate-client
[coverage-image]: https://img.shields.io/coveralls/sinnerschrader/patternplate-client.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/sinnerschrader/patternplate-client
[climate-image]: https://img.shields.io/codeclimate/github/sinnerschrader/patternplate-client.svg?style=flat-square

[pr-url]: http://issuestats.com/github/sinnerschrader/patternplate-client
[pr-image]: http://issuestats.com/github/sinnerschrader/patternplate-client/badge/pr?style=flat-square
[issue-url]: https://github.com/sinnerschrader/patternplate/issues
[issue-image]: http://issuestats.com/github/sinnerschrader/patternplate/badge/issue?style=flat-square

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

[patternplate-url]: https://github.com/sinnerschrader/patternplate
