from django.db import models
from django.contrib.auth.models import User


def nameFile(instance, filename):
    return '/'.join(['images', str(instance.name), filename])


class imageupload(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=50)
    images = models.ImageField('images', upload_to=nameFile)
