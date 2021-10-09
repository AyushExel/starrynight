from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from django.urls import path
from .views import RegisterView, ChangePasswordView, UpdateProfileView, CustomJWTSerializer, LoginView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView


urlpatterns = [
    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="auth_register"),
    path(
        "change_password/<int:pk>/",
        ChangePasswordView.as_view(),
        name="auth_change_password",
    ),
    path(
        "update_profile/<int:pk>/",
        UpdateProfileView.as_view(),
        name="auth_update_profile",
    ),
]
"""
urlpatterns = [
    path("login/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("register", ResgisterView.as_view(), name="register"),
    path("test_login", getProfile, name="test_login"),
]
"""
