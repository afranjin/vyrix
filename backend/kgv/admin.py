# -*- coding: utf-8 -*-
from django.contrib import admin
from kgv.models import (
    Permission,
    UserPermissions,
    Configuration
)

admin.site.register(Permission)
admin.site.register(UserPermissions)
admin.site.register(Configuration)
