<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/sinnerschrader/patternplate-client/next/patternplate.svg" />
  </a>
</div>
<br />
<h1 align="center">☸ patternplate-client contribution guide</h1>
<p align="center">
  <b><a href="#got-a-question-or-problem">Questions</a></b> | <b><a href="#found-an-issue">Issues</a></b> | <b><a href="#want-to-contribute">Pull requests</a></b> | <b><a href="#coding-rules">Coding Rules</a></b> | <b><a href="#commit-rules">Commit Rules</a></b>
</p>
> Health

[![npm version][npm-image]][npm-url] [![Downloads][npm-dl-image]][npm-url]
[![Build status][ci-image]][ci-url] [![Coverage][coverage-image]][coverage-url]

Yeay! You want to contribute to patternplate-client. That's amazing!
To smoothen everyone's experience involved with the project please take note of the following guidelines and rules.

## Got a Question or Problem?
We are happy to help you with problems you may encounter when using patternplate-client. Join us at [gitter][gitter-url].

> Reach out

[![chat with patternplate][gitter-image]][gitter-url]

## Found an Issue?
Thank you for reporting any issues you find. We do our best to test and make patternplate-client as solid as possible, but any reported issue is a real help.
When encountering issues with patternplate-client, file your issue against the [patternplate](/sinnerschrader/patternplate) project and include `[patternplate-client]` in the subject.

> patternplate issues

[![Issues][issue-image]][issue-url]

<!-- Issues are disabled for now -->
<!-- Please follow these guidelines when reporting issues: -->
<!-- * Provide a title in the format of `<Error> when <Task>` -->
<!-- * Tag your issue with the tag `bug` -->
<!-- * Provide a short summary of what you are trying to do -->
<!-- * Provide the log of the encountered error if applicable -->
<!-- * Provide the exact version of patternplate-client. Check `npm ls patternplate-client` when in doubt -->
<!-- * Be awesome and consider contributing a [pull request](#want-to-contribute) -->

## Want to contribute?
You consider contributing changes to patternplate-client – we dig that!
Please consider these guidelines when filing a pull request:

> patternplate-client pull requests

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
To keep the code base of patternplate-client neat and tidy the following rules apply to every change

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
To help everyone with understanding the commit history of patternplate-client the following commit rules are enforced.
To make your life easier patternplate-client is commitizen-friendly and provides the npm run-script `commit`.

> Commit standards

[![Commitizen friendly][commitizen-image]][commitizen-url]

* [conventional-changelog](/commitizen/cz-conventional-changelog)
* present tense
* maximum of 100 characters
* message format of `$type($scope): $message`

---
patternplate-client is built by SinnerSchrader and [contributors](./documentation/contributors.md) with :heart:
and released under the [MIT License](./license.md).

[commitizen-url]: http://commitizen.github.io/cz-cli/
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-3989c9.svg?style=flat-square

[pr-url]: http://issuestats.com/github/sinnerschrader/patternplate-client
[pr-image]: http://issuestats.com/github/sinnerschrader/patternplate-client/badge/pr?style=flat-square
[issue-url]: https://github.com/sinnerschrader/patternplate/issues
[issue-image]: http://issuestats.com/github/sinnerschrader/patternplate/badge/issue?style=flat-square

[ecma-image]: https://img.shields.io/badge/babel%20stage-0-3989c9.svg?style=flat-square
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-xo-3989c9.svg?style=flat-square

[gitter-image]: https://img.shields.io/badge/gitter-join%20chat-3989c9.svg?style=flat-square
[gitter-url]: https://gitter.im/sinnerschrader/patternplate

[npm-url]: https://www.npmjs.org/package/patternplate-client
[npm-image]: https://img.shields.io/npm/v/patternplate-client.svg?style=flat-square
[npm-dl-image]: http://img.shields.io/npm/dm/patternplate-client.svg?style=flat-square

[ci-url]: https://travis-ci.org/sinnerschrader/patternplate-client
[ci-image]: https://img.shields.io/travis/sinnerschrader/patternplate-client.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/sinnerschrader/patternplate-client
[coverage-image]: https://img.shields.io/coveralls/sinnerschrader/patternplate-client.svg?style=flat-square
