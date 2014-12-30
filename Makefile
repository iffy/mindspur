.PHONY: watch_css


www/css/mindspur.css: scss/mindspur.scss
	sass -I www -I scss scss/mindspur.scss > www/css/mindspur.css

watch_css:
	$(MAKE) www/css/mindspur.css
	watchmedo shell-command -c 'make www/css/mindspur.css' scss/
