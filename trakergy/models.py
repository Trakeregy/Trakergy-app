import string
from typing import List, Any

from django.core.mail import send_mail
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError


# holds definitions for our modules (classes)
def upload_to(instance, filename):
    return f'images/{filename}'


def validate_image(image):
    file_size = image.size
    limit_mb = 5
    if file_size > limit_mb * 1024 * 1024:
        raise ValidationError(f'Max size of file is {limit_mb} MB')


class CustomUser(AbstractUser):
    # additional fields added to the default user object
    image_url = models.URLField(blank=False, null=True)


class MediaItem(models.Model):
    image = models.ImageField(upload_to=upload_to, blank=True, null=True, validators=[validate_image])


class Tag(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name


class Location(models.Model):
    code = models.TextField()
    country = models.TextField()

    def __str__(self):
        return str(self.country) + ' (' + str(self.code) + ')'


class Trip(models.Model):
    name = models.TextField()
    from_date = models.DateField()
    to_date = models.DateField()
    image_url = models.URLField(max_length=500, blank=False, null=True)
    description = models.TextField(blank=False, null=True)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    members = models.ManyToManyField(CustomUser, related_name='trips')
    admin = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Expense(models.Model):
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    description = models.TextField(null=False, default='')
    date = models.DateField()
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True)
    payer = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='expense_payer')
    trip = models.ForeignKey(Trip, on_delete=models.SET_NULL, null=True)
    users_to_split = models.ManyToManyField(CustomUser, through='Payment', related_name='expense_users')

    def __str__(self):
        return str(self.amount) + ' ' + str(self.date)


class Payment(models.Model):
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_paid = models.BooleanField(default=False, blank=False, null=False)
    payment_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('expense', 'user')
