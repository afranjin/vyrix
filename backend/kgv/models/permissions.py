# -*- coding: utf-8 -*-
import typing
from django.db import models, transaction
from django.contrib.auth.models import User
from kgv.contrib.django import get_unique_or_none


class AvailablePermissions:

    AdministrateUsers = "administrate-users"
    AdministrateEmailConfiguration = "administrate-email-configuration"

    @classmethod
    def all(cls):
        return [
            cls.AdministrateUsers,
            cls.AdministrateEmailConfiguration,
        ]


class Permission(models.Model):

    title = models.CharField(
        max_length=120,
        help_text='the title of the permission'
    )

    identifier = models.CharField(
        max_length=40,
        unique=True,
        help_text='the identifier of the permission, has to be unique'
    )

    description = models.TextField(
        default='',
        help_text='further description of the permission'
    )

    @classmethod
    def update_permissions(cls):
        from kgv.management.fixtures import load_fixture
        fixtures = load_fixture('permissions')

        for permission in AvailablePermissions.all():

            fixture = {}
            for f in fixtures:
                if f['identifier'] == permission:
                    fixture = f

            existing = get_unique_or_none(Permission, identifier=permission)

            if not existing:
                existing = Permission()
                existing.identifier = permission

            existing.title = fixture.get('title', existing.title)
            existing.description = fixture.get('description', existing.description)
            existing.save()

    def __str__(self):
        return f'{self.title}:{self.identifier}'


class UserPermissions(models.Model):

    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        help_text='the user who owns a permission'
    )

    permission = models.ForeignKey(
        to=Permission,
        on_delete=models.CASCADE,
        help_text='the permission the user owns'
    )

    @classmethod
    def update_user_with_permissions(cls, user: User, permissions: typing.List[str]):
        with transaction.atomic():
            for item in UserPermissions.objects.filter(user=user):
                item.delete()
            for permission_ident in permissions:
                permission = get_unique_or_none(Permission, identifier=permission_ident)
                item = UserPermissions()
                item.permission = permission
                item.user = user
                item.save()

    def __str__(self):
        return f'{self.user.email}:{self.permission.identifier}'

    @classmethod
    def permissions_by_user(cls, user: User) -> typing.List[Permission]:
        return [x.permission for x in UserPermissions.objects.filter(user=user)]

    class Meta:
        unique_together = ('user', 'permission')

