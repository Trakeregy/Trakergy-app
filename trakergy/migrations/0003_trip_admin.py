# Generated by Django 4.1.3 on 2023-02-04 14:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trakergy', '0002_location_tag_trip_expense'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='admin',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]