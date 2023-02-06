from django.db import models
from django.contrib.auth.models import AbstractUser


# holds definitions for our modules (classes)

class CustomUser(AbstractUser):
    # additional fields added to the default user object
    image_url = models.URLField(blank=False, null=True)


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
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    members = models.ManyToManyField(CustomUser, related_name='trips')
    admin = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Expense(models.Model):
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    description = models.TextField(null=False, default='')
    date = models.DateField(null=True)
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL, null=True)
    payer = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    trip = models.ForeignKey(Trip, on_delete=models.SET_NULL, null=True)
    users_to_split = models.ManyToManyField(CustomUser, related_name='expenses', blank=True)

    def __str__(self):
        return str(self.amount) + ' ' + str(self.date) + ' ' + str(self.tag.name) + ' ' + str(self.payer.id)
