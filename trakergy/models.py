from django.db import models
from django.contrib.auth.models import AbstractUser


# holds definitions for our modules (classes)

class CustomUser(AbstractUser):
    # additional fields added to the default user object
    image_url = models.URLField(blank=False, null=True)