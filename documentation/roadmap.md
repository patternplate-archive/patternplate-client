<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/sinnerschrader/patternplate-client/master/patternplate.svg" />
  </a>
</div>
<h1 align="center">☸ patternplate-client roadmap</h1>

> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]
[![Build status][ci-image]][ci-url] [![Coverage][coverage-image]][coverage-url]

This is a rough roadmap for patternplate-client, which is steadily updated and evolves with the project.

## Project
- [x] Project setup
- [x] Extensive testing facilities
- [x] Extensive CI setup
- [x] Generate documentation
- [x] Documentation template for all patternplate projects
- [x] Contribution guide template

## Features
- [ ] **manifest.validate**
	- [ ] JSON schema validation for `pattern.json`
	- [ ] Register JSON schema with jsonschema.org
- [ ] **meta**
	- [ ] Move `meta.meta` to default export
	- [x] Basic error handling
	- [x] Mechanism to pass warnings up the chain
	- [x] Fetch basic meta data for a given pattern tree
	- [ ] Add dependencies to results
	- [ ] Handle circular dependencies
	- [ ] Add manifest meta data to results
	- [ ] Add file dictionaries to results
	- [ ] Watch pattern tree for changes and return relevant subtree
- [ ] **query**
	- [ ] Move `query.query` to default export
	- [x] Basic error handling
	- [x] Use `meta` to get pattern meta data
	- [ ] Query meta data for a given pattern tree
	- [ ] Watch pattern tree for changes and return relevant subtree
	- [ ] Query Engine to filter results

## Integration
- [ ] Test in use with command line utility `patternplate-manager`
- [ ] Replace portions of pattern hook in `patternplate-server`
- [ ] Replace `patternplate-server` pattern hook completely

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
