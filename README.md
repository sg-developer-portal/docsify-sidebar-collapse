# docsify-sidebar-collapse

> !! This plugin depends on the [docsify-themeable plugin](https://github.com/jhildenbiddle/docsify-themeable) !!

> !! The sidebar will no longer contain the page's TOC, take a look at Ducksss awesome [docsify TOC plugin](https://github.com/sg-developer-portal/docsify-toc-plugin) instead !!

## Usage

1. Configure docsify-sidebar-collapse plugin:
```html
<script>
	window.$docsify = {
		 enableSidebarCollapse: true
	};
</script>
```

2. Insert script into docsify document:
```html
<head>
    <!-- Themes (light + dark) -->
   <link rel="stylesheet" media="(prefers-color-scheme: dark)" href="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css">
   <link rel="stylesheet" media="(prefers-color-scheme: light)" href="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css">
</head>
<body>
    <!-- docsify-themeable -->
    <script src="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/js/docsify-themeable.min.js"></script>
    <!-- docsify-sidebar-collapse -->
    <script src="https://unpkg.com/@lx0f/docsify-sidebar-collapse@latest/dist/docsify-sidebar-collapse.bundle.js"></script>
</body>
```

3. Setup _sidebar.md
```md
- Folder

    - [Usage](usage.md)
    - [Contributing](contributing.md)

    - Homework Folder
        - [Secret Sauce](krabby-patty/secret-sauce.md)
        - [One Piece](oda-basement.md)

- **Bolded Folder**

    - **Another Bolded Folder**
        - [Your IP Address](ip-address.md)

- [How To Centre Div](https://luthandyka.dev)
```

