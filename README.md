# Development

To start a development server that will watch for file changes:

```sh
$ hugo server -w
```

Sometimes hugo gets out of sync with the latest file changes. If this happens, you can force hugo to rebuild everything when detecting a file change (warning: this slows down build times):

```sh
$ hugo server -w --disableFastRender
```

# To Build

To build site and place files in `public` directory:

```sh
$ hugo
```

# Recommended VS Code Plugins

* Code Spell Checker
