<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/sinnerschrader/patternplate-client/master/patternplate.svg" />
  </a>
</div>
<h1 align="center">☸ patternplate-client pattern concept</h1>

> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]
[![Build status][ci-image]][ci-url] [![Coverage][coverage-image]][coverage-url]

A pattern is the basic building block of pattern trees consumable by patternplate-client. Each pattern can contain code for frontend entities.
A pattern is formed by a directory containing a [manifest](#manifest) file and various source files.
Patterns that live inside a pattern tree [can depend](#dependencies) on other patterns in the same tree.

## Example pattern tree
```
patterns
├── first-pattern
│   ├── index.jsx
│   ├── index.js
│   ├── index.less
│   ├── index.md
│   └── pattern.json
└── second-pattern
    ├── index.jsx
    ├── index.less
    └── pattern.json
```
The displayed pattern tree consists of two patterns: `first-pattern` and `second-pattern`.

## Manifest
```json
{
	"name": "first-pattern",
	"version": "0.1.0",
	"patterns": {
		"second": "second-pattern"
	},
}
```

## Dependencies

---
patternplate-client is built by SinnerSchrader Deutschland GmbH and [contributors](./contributors.md) with :heart:
and released under the [MIT License](./license.md).

[npm-url]: https://www.npmjs.org/package/patternplate-client
[npm-image]: https://img.shields.io/npm/v/patternplate-client.svg?style=flat-square
[npm-dl-image]: http://img.shields.io/npm/dm/patternplate-client.svg?style=flat-square

[ci-url]: https://travis-ci.org/sinnerschrader/patternplate-client
[ci-image]: https://img.shields.io/travis/sinnerschrader/patternplate-client.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/sinnerschrader/patternplate-client
[coverage-image]: https://img.shields.io/coveralls/sinnerschrader/patternplate-client.svg?style=flat-square
