call python manage.py makemigrations
call python manage.py migrate
call python manage.py loaddata .\trakergy\fixtures\tag_data.json
call python manage.py loaddata .\trakergy\fixtures\locations_data.json
call python manage.py runserver