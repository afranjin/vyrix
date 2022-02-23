# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand
from kgv.models import Permission, Configuration


class Command(BaseCommand):

    help = "This command setup initial development data"

    def handle(self, *args, **options):
        Permission.update_permissions()
        Configuration.update_configs()
