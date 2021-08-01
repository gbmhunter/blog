# Overview

This repo contains the code which is used to build my blog at <blog.mbedded.ninja>.

The static site generator Hugo is used to build the website from the files in this repo. Netlify is used to deploy and host the website.

# Development

1. The recommended code editor is [Visual Studio Code](https://code.visualstudio.com/).

1. Follow the instructions [here](https://gohugo.io/getting-started/installing) to install Hugo (using `chocolatey` to install is recommended when running Windows). **Make sure to install the extended version, as we need to compile `.scss` files into `.css`.

1. Install ruby. This is needed to render the AsciiDoc pages.

    ```powershell
    choco install ruby
    ```

1. Then `asciidoctor` and `rouge` (for syntax highlighting) can be installed by using `bundle`, which uses the `Gemfile` in the root directory of this repo (Linux, MacOS, Windows):

    ```sh
    bundle install
    ```

1. To start a development server that will watch for file changes (`w`), build drafts (`D`) and build future content (`F`). Since this is a large site, we'll also use `--renderToDisk` otherwise it can take up 6GB of memory:

    ```sh
    $ hugo server -wDF --renderToDisk
    ```

1. Development server should now be live at `localhost:1313`.

Sometimes hugo gets out of sync with the latest file changes. If this happens, you can force hugo to rebuild everything when detecting a file change (warning: this slows down build times):

```sh
$ hugo server -wDF --disableFastRender --renderToDisk
```

There are test pages filled with different shortcode and style tests.

* Markdown: `/posts/tests/markdown`
* AsciiDoc: `/posts/tests/asciidoc`

# To Build

To build site and place files in `public` directory:

```sh
$ hugo
```

To sync the Algolia index with the current state of the hugo site, make sure you've built the site by running `hugo`, and then:

```sh
yarn algolia
```

# Directory Structure

<ul>
  <li><b>content/</b> <i>Markdown files which contain the content which creates the sites pages and posts.</i></li>
  <li><b>layouts/</b>
    <ul>
      <li>
        <b>shortcodes</b> <i>Hugo shortcodes.</i>
        <ul>
          <li><b>calculators</b> <i>Contains the HTML/CSS/jQuery based interactive calculators which are embedded into certain pages.</i></li>
        </ul>
      </li>
    </ul>
  </li>
  <li><b>old/</b> <i>Deprecated content which is kept around just in case I need it again.</i></li>
  <li><b>requirements/</b> <i>Contains a requirements.txt used to create a Python virtual environment for running the various Python scripts in this repo.</i></li>
  <li><b>scripts/</b> <i>Useful Python scripts to automate some laborious tasks.</i></li>
</ul>

# Broken Link Checking

I use the great LinkChecker.

You can install this with `pipenv` using:

```bash
$ pipenv install --two LinkChecker
```

# Recommended VS Code Plugins

* `Code Spell Checker`: Prevents spelling mistakes. Additional dictionary definitions are included in `.vscode/settings.json` under `"cSpell.words"`. Make sure to add new words to the "workspace directory" so they get added to this file.
* `Vim`: If you're a vim fan!
* `EditorConfig for VS Code`: Promotes consistent coding styles, incl. indentation rules. Reads rules from `.editorconfig` in this repo's root directory.
* `Better TOML`: For syntax highlighting in the Hugo config file `config.toml`
* `AsciiDoc`: For syntax highlighting of AsciiDoc pages (with the `.adoc` extension). Don't rely on it for rendering, use the browser with `hugo` and live file watching for that.

# Markdown Extensions

The syntax `<www.google.com>` can be used (instead of `[www.google.com](www.google.com)`) to include a link in where the displayed text is the same as the href.

# Diagrams

Diagrams are typically drawn in _LibreOffice Draw_ and then exported to `.svg` to display on a page. The Draw file (`.odg`) is usually located in the same content directory as the page the diagram is shown on.