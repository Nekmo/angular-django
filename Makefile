
export VERSION := $(version)

publish-angular:
    ifndef VERSION
    $(error version variable is not set. Use make version=major|minor|patch publish-angular)
    endif
	cd src/angular/projects/angular-django && npm version $(version) && cd ../../ && ng build --prod && cd dist/angular-django && npm publish

publish-django:
    ifndef VERSION
    $(error version variable is not set. Use make version=major|minor|patch publish-django)
    endif
	rm -f dist/* && bumpversion $(VERSION) && python setup.py sdist bdist_wheel && twine check dist/* && twine upload dist/*


