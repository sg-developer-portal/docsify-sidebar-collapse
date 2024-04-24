# docsify-sidebar-collapse

## Install

Copy the css link into your html file.

```html
<!-- index.html -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@lx0f/docsify-sidebar-collapse@2.0.24/dist/index.css"
/>
```

Copy the script tag into your html file.

```html
<script src="https://cdn.jsdelivr.net/npm/@lx0f/docsify-sidebar-collapse@2.0.24/dist/index.js"></script>
```

Setup sidebar configuration in your docsify config.

> NOTE! Base path uses the `nameLink` config name

```js
window.$docsify = {
  enableSidebarCollapse: true,
  nameLink: "/docs/slug",
};
```

## Publishing

### GitHub

If semantic release fails during GitHub Actions, please ensure that the **GH_TOKEN** provided is valid and contains the correct permissions. Members of the repo can consider updating the token under secrets of the project if the existing token is lost. The Perosnal Access Token can be created under member's personal setting and a **repo** scope is needed for the release to run.

### NPM

If publishing fails during GitHub Actions, please ensure that the **NPM_TOKEN** provided is valid and contains the correct permissions. Member of the repo (on GitHub and NPM) can consider updating the secrets of the project if the existing token is lost.