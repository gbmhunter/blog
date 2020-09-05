# Overview

This repo contains the code which is used to build my blog at <blog.mbedded.ninja>.

The static site generator Hugo is used to build the website from the files in this repo. Netlify is used to host the website, along with a few AWS services (built with serverless) to host an API/database for the shurikens.

# Development

The recommended code editor is [Visual Studio Code](https://code.visualstudio.com/).

Follow the instructions [here](https://gohugo.io/getting-started/installing) to install Hugo (using `chocolatey` to install is recommended when running Windows).

To start a development server that will watch for file changes (`w`), build drafts (`D`) and build future content (`F`):

```sh
$ hugo server -wDF
```

Sometimes hugo gets out of sync with the latest file changes. If this happens, you can force hugo to rebuild everything when detecting a file change (warning: this slows down build times):

```sh
$ hugo server -wDF --disableFastRender
```

There is a test page filled with different shortcode and style tests. It is located at `/posts/test-page/`.

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

* Code Spell Checker (prevents spelling mistakes). Additional dictionary definitions are included in `vscode.code-workspace`.
* Vim (if you're a vim fan!)
* EditorConfig for VS Code (promotes consistent coding styles, incl. indentation rules)
* `Better TOML`: For syntax highlighting in the Hugo config file `config.toml`

# Markdown Extensions

The syntax `<www.google.com>` can be used (instead of `[www.google.com](www.google.com)`) to include a link in where the displayed text is the same as the href.

# Diagrams

Diagrams are typically drawn in _LibreOffice Draw_ and then exported to `.svg` to display on a page. The Draw file (`.odg`) is usually located in the same content directory as the page the diagram is shown on.