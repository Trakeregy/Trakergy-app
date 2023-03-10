# Generated by Django 4.1.3 on 2023-02-06 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trakergy', '0010_rename_users_expense_users_to_split'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='payment_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='payment',
            unique_together={('expense', 'user')},
        ),
    ]
