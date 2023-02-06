#!/bin/bash

python manage.py makemigrations
python manage.py migrate
python manage.py loaddata ./trakergy/fixtures/tag_data.json
python manage.py loaddata ./trakergy/fixtures/locations_data.json
python manage.py runserver