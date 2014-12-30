.PHONY: watch_css


css/mindspur.css: scss/mindspur.scss
	sass -I . -I scss scss/mindspur.scss > css/mindspur.css

watch_css:
	$(MAKE) css/mindspur.css
	watchmedo shell-command -c 'make css/mindspur.css' scss/
