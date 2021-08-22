
export VERSION := $(version)

publish-angular:
    ifndef VERSION
    $(error version variable is not set. Use npm version=major|minor|patch publish-angular)
    endif
	cd src/angular/projects/angular-django && npm version $(version) && cd ../../ && ng build --prod && cd dist/angular-django && npm publish
