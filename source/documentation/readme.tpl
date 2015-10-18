<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/${props.pkg.repository.slug}/next/patternplate.svg" />
  </a>
</div>
<h1 align="center">☸ ${props.pkg.name} documentation</h1>
<p align="center">
  <b><a href="./api.md">API reference</a></b> | <b><a href="./development.md">Development</a></b> | <b><a href="./roadmap.md">Roadmap</a></b> | <b><a href="../contributing.md">Contributing</a></b> | <b><a href="./contributors.md">Contributors</a></b>
</p>
> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]
[![Build status][ci-image]][ci-url] [![Coverage][coverage-image]][coverage-url]

Welcome to ${props.pkg.name} documentation. This is a index site for `./documentation`. This documentation includes:

## API reference
`jsdoc` generated API Reference including unit-tested code examples. This is the definitive source of truth for ${props.pkg.name}'s public API.

↳ [Read API reference](./api.md)

## Development
Terse guide about developing in ${props.pkg.name}. Consult this when working on improvements and/or preparing pull requests.

↳ [Learn developing ${props.pkg.name}](./development.md)

## Roadmap
Rough roadmap for ${props.pkg.name}. This is not bound to any version number but provides additional information about ${props.pkg.name} in the patternplate project family tree.

↳ [Read where this is going](./roadmap.md)

## Contributing
${props.pkg.name} contains our commit- and coding-rules as well as valuable hints about contributing to ${props.pkg.name}

↳ [Get involved](../contributing.md)

## Contributors
${props.pkg.name} is an open source project and maintained by contributors.

↳ [Get to know them](../contributors.md)

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
