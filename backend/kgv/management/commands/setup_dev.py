# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from kgv.contrib.django import get_unique_or_none


class Command(BaseCommand):

    help = "This command setup initial development data"

    def add_superuser(self, username, email, password):
        user = get_unique_or_none(User, email=email)

        if not user:
            user = User()
            user.email = email
        user.username = username
        user.is_superuser = True
        user.is_staff = True
        user.set_password(password)
        user.save()

    def handle(self, *args, **options):
        self.add_superuser('boss-user', 'boss@semantic-applications.de', 'password')
