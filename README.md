# docsify-sidebar-collapse

## Install

Copy the css link into your html file.

```html
<!-- index.html -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@lx0f/docsify-sidebar-collapse@2.0.0/dist/index.css"
/>
```

Copy the script tag into your html file.

```html
<script src="https://cdn.jsdelivr.net/npm/@lx0f/docsify-sidebar-collapse@2.0.0/dist/index.js"></script>
```

Setup sidebar configuration in your docsify config.

> NOTE! Base path uses the `nameLink` config name

```js
window.$docsify = {
  enableSidebarCollapse: true,
  nameLink: "/docs/slug",
};
```
