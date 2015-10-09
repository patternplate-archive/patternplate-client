<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/${props.pkg.repository.slug}/master/patternplate.svg" />
  </a>
</div>
<h1 align="center">☸ ${props.pkg.name} roadmap</h1>

> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]
[![Build status][ci-image]][ci-url] [![Coverage][coverage-image]][coverage-url]

This is a rough roadmap for ${props.pkg.name}, which is steadily updated and evolves with the project.

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
${props.pkg.name} is built by ${props.pkg.author.name} and [contributors](./contributors.md) with :heart:
and released under the [MIT License](./license.md).

[npm-url]: https://www.npmjs.org/package/${props.pkg.name}
[npm-image]: https://img.shields.io/npm/v/${props.pkg.name}.svg?style=flat-square
[npm-dl-image]: http://img.shields.io/npm/dm/${props.pkg.name}.svg?style=flat-square

[ci-url]: https://travis-ci.org/${props.pkg.repository.slug}
[ci-image]: https://img.shields.io/travis/${props.pkg.repository.slug}.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/${props.pkg.repository.slug}
[coverage-image]: https://img.shields.io/coveralls/${props.pkg.repository.slug}.svg?style=flat-square
