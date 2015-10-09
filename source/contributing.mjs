<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/${props.pkg.repository.slug}/master/patternplate.svg" />
  </a>
</div>
<br />
<h1 align="center">☸ ${props.pkg.name} contribution guide</h1>
<p align="center">
  <b><a href="#got-a-question-or-problem">Questions</a></b> | <b><a href="#found-an-issue">Issues</a></b> | <b><a href="#want-to-contribute">Pull requests</a></b> | <b><a href="#coding-rules">Coding Rules</a></b> | <b><a href="#commit-rules">Commit Rules</a></b>
</p>
> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]
[![Build status][ci-image]][ci-url] [![Coverage][coverage-image]][coverage-url]

Yeay! You want to contribute to ${props.pkg.name}. That's amazing!
To smoothen everyone's experience involved with the project please take note of the following guidelines and rules.

## Got a Question or Problem?
We are happy to help you with problems you may encounter when using ${props.pkg.name}. Join us at [gitter][gitter-url].

> Reach out

[![chat with patternplate][gitter-image]][gitter-url]

## Found an Issue?
Thank you for reporting any issues you find. We do our best to test and make ${props.pkg.name} as solid as possible, but any reported issue is a real help.
When encountering issues with ${props.pkg.name}, file your issue against the [patternplate](/sinnerschrader/patternplate) project and include `[${props.pkg.name}]` in the subject.

> patternplate issues

[![Issues][issue-image]][issue-url]

<!-- Issues are disabled for now -->
<!-- Please follow these guidelines when reporting issues: -->
<!-- * Provide a title in the format of `<Error> when <Task>` -->
<!-- * Tag your issue with the tag `bug` -->
<!-- * Provide a short summary of what you are trying to do -->
<!-- * Provide the log of the encountered error if applicable -->
<!-- * Provide the exact version of ${props.pkg.name}. Check `npm ls ${props.pkg.name}` when in doubt -->
<!-- * Be awesome and consider contributing a [pull request](#want-to-contribute) -->

## Want to contribute?
You consider contributing changes to ${props.pkg.name} – we dig that!
Please consider these guidelines when filing a pull request:

> ${props.pkg.name} pull requests

[![Pull requests][pr-image]][pr-url]

* Follow the [Coding Rules](#coding-rules)
* Follow the [Commit Rules](#commit-rules)
* Make sure you rebased the current master branch when filing the pull request
* Squash your commits when filing the pull request
* Provide a short title with a maximum of 100 characters
* Provide a more detailed description containing
	* What you want to achieve
	* What you changed
	* What you added
	* What you removed

## Coding Rules
To keep the code base of ${props.pkg.name} neat and tidy the following rules apply to every change

> Coding standards

![Ecmascript version][ecma-image] [![Javascript coding style][codestyle-image]][codestyle-url]

* [Happiness](/sindresorhus/xo) enforced via eslint
* Use advanced language features where possible
* JSdoc comments for everything
* Favor micro library over swiss army knives (rimraf, ncp vs. fs-extra)
* Coverage never drops below 90%
* No change may lower coverage by more than 5%
* Be awesome

## Commit Rules
To help everyone with understanding the commit history of ${props.pkg.name} the following commit rules are enforced.
To make your life easier ${props.pkg.name} is commitizen-friendly and provides the npm run-script `commit`.

> Commit standards

[![Commitizen friendly][commitizen-image]][commitizen-url]

* [conventional-changelog](/commitizen/cz-conventional-changelog)
* present tense
* maximum of 100 characters
* message format of `$type($scope): $message`

---
${props.pkg.name} is built by ${props.pkg.author.name} and [contributors](./documentation/contributors.md) with :heart:
and released under the [MIT License](./license.md).

[commitizen-url]: http://commitizen.github.io/cz-cli/
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-3989c9.svg?style=flat-square

[pr-url]: http://issuestats.com/github/${props.pkg.repository.slug}
[pr-image]: http://issuestats.com/github/${props.pkg.repository.slug}/badge/pr?style=flat-square
[issue-url]: ${props.pkg.bugs.url}
[issue-image]: http://issuestats.com/github/${props.pkg.bugs.slug}/badge/issue?style=flat-square

[ecma-image]: https://img.shields.io/badge/babel%20stage-0-3989c9.svg?style=flat-square
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-xo-3989c9.svg?style=flat-square

[gitter-image]: https://img.shields.io/badge/gitter-join%20chat-3989c9.svg?style=flat-square
[gitter-url]: https://gitter.im/sinnerschrader/patternplate

[npm-url]: https://www.npmjs.org/package/${props.pkg.name}
[npm-image]: https://img.shields.io/npm/v/${props.pkg.name}.svg?style=flat-square
[npm-dl-image]: http://img.shields.io/npm/dm/${props.pkg.name}.svg?style=flat-square

[ci-url]: https://travis-ci.org/${props.pkg.repository.slug}
[ci-image]: https://img.shields.io/travis/${props.pkg.repository.slug}.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/${props.pkg.repository.slug}
[coverage-image]: https://img.shields.io/coveralls/${props.pkg.repository.slug}.svg?style=flat-square
