##############
angular-django
##############


.. image:: https://raw.githubusercontent.com/Nekmo/angular-django/pip-rating-badge/pip-rating-badge.svg
  :target: https://github.com/Nekmo/angular-django/actions/workflows/pip-rating.yml
  :alt: pip-rating badge

.. image:: https://img.shields.io/github/actions/workflow/status/Nekmo/angular-django/test.yml?style=flat-square&maxAge=2592000&branch=master
  :target: https://github.com/Nekmo/angular-django/actions?query=workflow%3ATests
  :alt: Latest Tests CI build status

.. image:: https://img.shields.io/pypi/v/angular-django.svg?style=flat-square
  :target: https://pypi.org/project/angular-django/
  :alt: Latest PyPI version

.. image:: https://img.shields.io/pypi/pyversions/angular-django.svg?style=flat-square
  :target: https://pypi.org/project/angular-django/
  :alt: Python versions

.. image:: https://img.shields.io/codeclimate/maintainability/Nekmo/angular-django.svg?style=flat-square
  :target: https://codeclimate.com/github/Nekmo/angular-django
  :alt: Code Climate

.. image:: https://img.shields.io/codecov/c/github/Nekmo/angular-django/master.svg?style=flat-square
  :target: https://codecov.io/github/Nekmo/angular-django
  :alt: Test coverage


.. raw:: html

    <p align="center">
      <img src="https://raw.githubusercontent.com/Nekmo/angular-django/master/angular_django.svg"
           width="256px" height="256px" alt="Angular Django"/>
    </p>
    <p align="center"><strong><em>Work in Angular as in Django</em></strong></p>


**Angular Django** is a framework to work in *Angular* as in *Django*. Use the Django classes in Angular to build
**forms** and **data** grids in minutes. `A demo is available on the website <https://angular-django.nekmo.org/>`_.

Angular-django consists of **two packages**: a package for *Angular* and an optional package for *Django*. To install
the Angular package:

.. code-block:: shell

    $ npm i angular-django


To install the Django package:

.. code-block:: shell

    $ pip install -U angular-django

Full instructions are available `on the website <https://angular-django.nekmo.org/installation>`_.


Features
========
Some features available:

* Use the methods and filters available in the Django Rest Framework to work with the API.
* Build forms in minutes. Includes validation on frontend and backend. Selector choices are built with the server.
* Easy-to-implement filtering, paging, and searching listings.
* Use your Django classes and types in Angular. The library will transform the API values to the correct types.
