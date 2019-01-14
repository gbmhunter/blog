# Development

The recommended code editor is [Visual Studio Code](https://code.visualstudio.com/).

Follow the instructions [here](https://gohugo.io/getting-started/installing) to install Hugo.

To start a development server that will watch for file changes:

```sh
$ hugo server -w --buildDrafts
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

# Directory Structure

<table>
    <tbody>
        <tr>
            <td>content/</td>
            <td>Markdown files which contain the content which creates the sites pages and posts.</td>
        </tr>
        <tr>
            <td>old/</td>
            <td>Deprecated content which is kept around just in case I need it again.</td>
        </tr>
        <tr>
            <td>scripts/</td>
            <td>Useful Python scripts to automate some labourous tasks.</td>
        </tr>
    </tbody>
</table>

# Recommended VS Code Plugins

* Better TOML
* Code Spell Checker
* Vim (if your're a vim fan!)
