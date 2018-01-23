# pello.io website
Based on Jekyll

```
bundle exec jekyll serve
```
# useful commandss
```
$ jekyll build
```
 => The current folder will be generated into ./_site

```
$ jekyll build --safe
```
Option for GitHub generation, does not generate any plugin or dynamic content

```
$ jekyll build --destination <destination>
```
=> The current folder will be generated into <destination>

```
$ jekyll build --source <source> --destination <destination>
```
 => The <source> folder will be generated into <destination>

```
$ jekyll build --watch
```
 => The current folder will be generated into ./_site,
   watched for changes, and regenerated automatically.
   
# Plugins instalation
In _config.yml
```
plugins: [jekyll-coffeescript, jekyll-watch, jekyll-assets]
```
Instalation:
```
gem install jekyll-coffeescript jekyll-watch jekyll-assets
```

# Using theme: minima

*Minima is a one-size-fits-all Jekyll theme for writers*. It's Jekyll's default (and first) theme. It's what you get when you run `jekyll new`.

[Theme preview](https://jekyll.github.io/minima/)

![minima theme preview](/screenshot.png)

