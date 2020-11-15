#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

python manage.py collectstatic --no-input
python manage.py migrate --no-input
python manage.py import_pokedex
python manage.py createsuperuser --username demo --email demo@nekmo.org --no-input || true

exec "$@"
