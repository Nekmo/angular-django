#!/usr/bin/env python
# -*- coding: utf-8 -*-
import copy
from itertools import chain
from setuptools import setup

REQUIREMENT_FILE = 'requirements.in'
DEV_STATUS = 'Production/Stable'  # Planning, Pre-Alpha, Alpha, Beta, Production/Stable, Mature, Inactive
CLASSIFIERS = [  # https://github.com/github/choosealicense.com/tree/gh-pages/_licenses
    'License :: OSI Approved :: MIT License',
    # 'License :: OSI Approved :: BSD License',
    # 'License :: OSI Approved :: ISC License (ISCL)',
    # 'License :: OSI Approved :: Apache Software License',
    # 'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
]  # https://pypi.python.org/pypi?%3Aaction=list_classifiers
NATURAL_LANGUAGE = 'English'
PLATFORMS = [
    # 'universal',
    'linux',
    # 'macosx',
    # 'solaris',
    # 'irix',
    # 'win'
    # 'bsd'
    # 'ios'
    # 'android'
]
PYTHON_VERSIONS = ['3.6', '3.7', '3.8', '3.9']


def get_python_classifiers(versions):
    for version in range(2, 4):
        if not next(iter(filter(lambda x: int(float(x)) != version, versions.copy())), False):
            versions.add('{} :: Only'.format(version))
            break
    return ['Programming Language :: Python :: %s' % version for version in versions]


def get_platform_classifiers(platform):
    parts = {
        'linux': ('POSIX', 'Linux'),
        'win': ('Microsoft', 'Windows'),
        'solaris': ('POSIX', 'SunOS/Solaris'),
        'aix': ('POSIX', 'Linux'),
        'unix': ('Unix',),
        'bsd': ('POSIX', 'BSD')
    }[platform]
    return ['Operating System :: {}'.format(' :: '.join(parts[:i+1]))
            for i in range(len(parts))]


def read_file(path):
    with open(path) as f:
        return f.read()


statuses = ['Planning', 'Pre-Alpha', 'Alpha', 'Beta', 'Production/Stable', 'Mature', 'Inactive']

# Classifiers
classifiers = copy.copy(CLASSIFIERS)
classifiers.extend(get_python_classifiers(set(PYTHON_VERSIONS) - {2.8, 2.9}))
classifiers.extend(chain(*[get_platform_classifiers(platform) for platform in PLATFORMS]))
classifiers.extend([
    'Natural Language :: {}'.format(NATURAL_LANGUAGE),
    'Development Status :: {} - {}'.format(statuses.index(DEV_STATUS) + 1, DEV_STATUS),
])


setup(
    classifiers=classifiers,
    platforms=PLATFORMS,
    install_requires=read_file(REQUIREMENT_FILE),
)
