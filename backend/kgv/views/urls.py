# -*- coding: utf-8 -*-
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

import kgv.views.rest.auth as auth
import kgv.views.rest.user as user
import kgv.views.rest.configuration as configuration


router = DefaultRouter()
router.register(r'users', user.UserViewSet, basename='user')

auth_urls = [
    path('login/', auth.ApiLoginView.as_view()),
    path('logout/', auth.ApiLogoutView.as_view()),
]

api_urls = [
    path('user/set-password', user.UserSetPasswordView.as_view()),
    path('user/update-permissions', user.UserSetPermissionsView.as_view()),
    path('user/totp-configuration', user.UserConfigureTotpView.as_view()),

    path('configuration/email', configuration.EMailConfigurationApiView.as_view()),

    path('auth/', include(auth_urls)),

    path('', include(router.urls))
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urls)),
]
