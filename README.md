## Overview

This repo contains the code which is used to build my blog at <blog.mbedded.ninja>.

The static site generator Hugo is used to build the website from the files in this repo. Netlify is used to deploy and host the website.

[![Netlify Status](https://api.netlify.com/api/v1/badges/3983d7b2-7481-4caa-9874-1ce1a3e82369/deploy-status)](https://app.netlify.com/sites/blog-mbedded-ninja/deploys)

## Development

1. The recommended code editor is [Visual Studio Code](https://code.visualstudio.com/).

1. Follow the instructions [here](https://gohugo.io/getting-started/installing) to install Hugo (using `chocolatey` to install is recommended when running Windows). **Make sure to install the extended version, as we need to compile `.scss` files into `.css`**.

1. Install ruby. This is needed to render the AsciiDoc pages.

    ```powershell
    choco install ruby
    ```

1. Then `asciidoctor` and `rouge` (for syntax highlighting) can be installed by using `bundle`, which uses the `Gemfile` in the root directory of this repo (Linux, MacOS, Windows):

    ```sh
    bundle install
    ```

1. To start a development server that will watch for file changes (`w`), build drafts (`D`) and build future content (`F`). Since this is a large site, we'll also use `--renderToDisk` otherwise it can take up 6GB of memory!!! Also add in `--navigateToChanged` so that when you save a source file, the server will automatically redirect the browser to the changed page:

    ```sh
    $ hugo server -wDF --renderToDisk --navigateToChanged
    ```

1. Development server should now be live at `localhost:1313`.

Sometimes hugo gets out of sync with the latest file changes. If this happens, you can force hugo to rebuild everything when detecting a file change (warning: this slows down build times):

```sh
$ hugo server -wDF --disableFastRender --renderToDisk
```

There are test pages filled with different shortcode and style tests.

* Markdown: `/posts/tests/markdown`
* AsciiDoc: `/posts/tests/asciidoc`

## To Build

To build site and place files in `public` directory:

```sh
$ hugo
```

## Directory Structure

```text
|--.vscode/
|  |--settings.json -> Contains the word dictionary for VS Code (under "cSpell.words")
|--assets
|  |--main.scss -> Main stylesheet. This requires `hugo-extended` to compile.
|--content/ -> Markdown files which contain the content which creates the sites pages and posts.
|--layouts/
|  |--shortcodes -> Hugo shortcodes.
|  |--calculators -> Contains the HTML/CSS/jQuery based interactive calculators which are embedded into certain pages (deprecated, these are now part of NinjaCalc)
|--old/ -> Deprecated content which is kept around just in case I need it again.
|--requirements/ -> Contains a requirements.txt used to create a Python virtual environment for running the various Python scripts in this repo.
|--scripts/ -> Useful Python scripts to automate some laborious tasks.
|--templates/ -> Contains Affinity Designer diagram template, various Python script templates and a Markdown page template.
```

## Recommended VS Code Plugins

* `Code Spell Checker`: Prevents spelling mistakes. Additional dictionary definitions are included in `.vscode/settings.json` under `"cSpell.words"`. Make sure to add new words to the "workspace directory" so they get added to this file.
* `Vim`: If you're a vim fan!
* `EditorConfig for VS Code`: Promotes consistent coding styles, incl. indentation rules. Reads rules from `.editorconfig` in this repo's root directory.
* `AsciiDoc`: For syntax highlighting of AsciiDoc pages (with the `.adoc` extension). Don't rely on it for rendering, use the browser with `hugo` and live file watching for that.

## Markdown Extensions

The syntax `<www.google.com>` can be used (instead of `[www.google.com](www.google.com)`) to include a link in where the displayed text is the same as the href.

## Diagrams

Diagrams are drawn in Affinity Designer.

Diagrams used to be drawn in _LibreOffice Draw_ and then exported to `.svg` to display on a page. The Draw file (`.odg`) is usually located in the same content directory as the page the diagram is shown on.

## Photos

Photos are edited in Affinity Photo. 

## Statistics

The code to generate blog statistics (e.g. number of visitors, increases since last year) is all contained in the separate repo <https://github.com/gbmhunter/blog-stats> (it needs to be separate because when it runs, it checks out specific commits of this repo).

## Link Checking

[lychee](https://github.com/lycheeverse/lychee) did not work so well since it's not that reliable to check the markdown file links, and it doesn't support recursive checking over HTML.

[broken-link-checker](https://github.com/stevenvachon/broken-link-checker) works ok.

```text
blc -rofe http://localhost:1313/ --requests 10
```

[linkcheck](https://github.com/filiph/linkcheck) runs out of memory.