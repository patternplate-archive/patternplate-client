<div align="center">
  <a href="https://github.com/sinnerschrader/patternplate">
    <img width="200" src="https://cdn.rawgit.com/${props.pkg.repository.slug}/next/patternplate.svg" />
  </a>
</div>
<h1 align="center">☸ ${props.pkg.name} contributors</h1>

|Gravatar | Name  | Email | Website |
|:---:    |:---   |:----  |:----    |
${props.pkg.contributors.map(function(contributor) {
  var name = contributor.name || 'Anonymous';
  var email = contributor.email || '';
  var avatar = '!['+name+'](https://s.gravatar.com/avatar/' + props.helpers.md5(email.trim()) + '?s=150)';
  var url = contributor.url ? '[To the interwebs!](' + contributor.url + ')' : 'none';
  email = email || 'none';
  return '|' + [avatar, name, email, url].join('|') + '|';
}).join('\n')}
<sub>Table is populated from package.json's contributors field.</sub><br />


---
${props.pkg.name} is built by ${props.pkg.author.name} and contributors with :heart:
and released under the [MIT License](./license.md).

[npm-url]: https://www.npmjs.org/package/${props.pkg.name}
[npm-image]: https://img.shields.io/npm/v/${props.pkg.name}.svg?style=flat-square
[npm-dl-image]: http://img.shields.io/npm/dm/${props.pkg.name}.svg?style=flat-square

[ci-url]: https://travis-ci.org/${props.pkg.repository.slug}
[ci-image]: https://img.shields.io/travis/${props.pkg.repository.slug}.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/${props.pkg.repository.slug}
[coverage-image]: https://img.shields.io/coveralls/${props.pkg.repository.slug}.svg?style=flat-square
