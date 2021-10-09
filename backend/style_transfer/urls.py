from os import name
from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from django.urls import path

from .views import PostImage, GetModels, uploadImage

urlpatterns = [
    path("style/", PostImage.as_view(), name="style"),
    path("stylev2/", uploadImage, name="stylev2"),
    path("models/", GetModels.as_view(), name="models")
]
