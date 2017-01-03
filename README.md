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