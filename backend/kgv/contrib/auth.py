# -*- coding: utf-8 -*-
import typing
from django.contrib.auth.models import User
from kgv.models import UserPermissions, Permission


def list_permission_identifier_by_user(user: User) -> typing.List[str]:
    if user.is_superuser:
        result = [x.identifier for x in Permission.objects.all()]
    else:
        result = [x.identifier for x in UserPermissions.permissions_by_user(user)]
    return result


def has_permission(user: User, permission: str) -> bool:
    if user.is_superuser:
        return True
    return permission in list_permission_identifier_by_user(user)
