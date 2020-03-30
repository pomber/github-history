<div align="center">
<a href="https://github.githistory.xyz/torvalds/linux/blob/master/kernel/up.c">
<img alt="demo" src="https://user-images.githubusercontent.com/1911623/54575634-9b10b000-49d3-11e9-8a19-56e40636e45d.gif" width="600" />
</a>
</div>

# [Git History](https://githistory.xyz)

Quickly browse the history of files in any git repo:

1. Go to a file in **GitHub** (or **GitLab**, or **Bitbucket**)
1. Replace `github.com` with `github.githistory.xyz`
1. There's no step three

Try it: [https://github.__githistory.xyz__/babel/babel/blob/master/packages/babel-core/test/browserify.js](https://github.githistory.xyz/babel/babel/blob/master/packages/babel-core/test/browserify.js)

> If you like this project consider [backing my open source work on Patreon!](https://patreon.com/pomber)  
> And follow [@pomber](https://twitter.com/pomber) on twitter for updates.

## Extensions

### Browsers

You can also add an `Open in Git History` button to GitHub, GitLab and Bitbucket with the [Chrome](https://chrome.google.com/webstore/detail/github-history-browser-ex/laghnmifffncfonaoffcndocllegejnf) and [Firefox](https://addons.mozilla.org/firefox/addon/github-history/) extensions.

<details><summary>Or you can use a bookmarklet.</summary>

```javascript
javascript: (function() {
  var url = window.location.href;
  var regEx = /^(https?\:\/\/)(www\.)?(github|gitlab|bitbucket)\.(com|org)\/(.*)$/i;
  if (regEx.test(url)) {
    url = url.replace(regEx, "$1$3.githistory.xyz/$5");
    window.open(url, "_blank");
  } else {
    alert("Not a Git File URL");
  }
})();
```

</details>

### Local Repos

You can use Git History for local git repos with the [CLI](https://github.com/pomber/git-history/tree/master/cli) or with the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=pomber.git-file-history).

## Support Git History

### Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/git-history#sponsor)]

<a href="https://opencollective.com/git-history/sponsor/0/website" target="_blank"><img src="https://opencollective.com/git-history/sponsor/0/avatar.svg"></a>

### Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/git-history#backer)]

<a href="https://opencollective.com/git-history#backers" target="_blank"><img src="https://opencollective.com/git-history/backers.svg?width=890"></a>

### Contributors

This project exists thanks to all the people who contribute.
<img src="https://opencollective.com/git-history/contributors.svg?width=890&button=false" />

### Thanks

<a href="https://www.browserstack.com/"><img src="https://user-images.githubusercontent.com/1911623/66797775-4d651300-eee2-11e9-9072-ef1dc670af1d.png" width="250" height="auto"/></a>

[BrowserStack](https://www.browserstack.com/) for letting open source projects use their services for free. Now I can test, debug and fix Safari issues from my Chrome running on Linux!

### Credits

Based on these amazing projects:

- [Prism](https://github.com/PrismJS/prism) by [Lea Verou](https://twitter.com/leaverou)
- [jsdiff](https://github.com/kpdecker/jsdiff) by [Kevin Decker](https://twitter.com/kpdecker)
- [Night Owl](https://github.com/sdras/night-owl-vscode-theme) by [Sarah Drasner](https://twitter.com/sarah_edo)

## License

MIT
