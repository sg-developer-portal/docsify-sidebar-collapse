# docsify-sidebar-collapse

## Install

Copy the css link into your html file.

```html
<!-- index.html -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@lx0f/docsify-sidebar-collapse@2.0.7/dist/index.css"
/>
```

Copy the script tag into your html file.

```html
<script src="https://cdn.jsdelivr.net/npm/@lx0f/docsify-sidebar-collapse@2.0.7/dist/index.js"></script>
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

1. Ensure you're inside the correct organisation
2. Update package.json version if needed
3. Build the artifacts with `npm run build`
4. Publish the artifacts with `npm publish --access public`
5. Complete OTP flow
