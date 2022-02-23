# -*- coding: utf-8 -*-
from django.db import models
from kgv.contrib.django import get_unique_or_none


class ConfigEmail(object):

    SenderAddress = 'SenderAddress'
    SenderPassword = 'SenderPassword'
    SMTPHost = 'SMTPHost'
    SMTPPort = 'SMTPPort'

    default_values = {
        'SenderAddress': 'sender@sender.com',
        'SenderPassword': 'password',
        'SMTPHost': 'smtp.gmail.com',
        'SMTPPort': '587',
    }


Configs = [ConfigEmail, ]


class Configuration(models.Model):

    key = models.CharField(
        max_length=100,
        unique=True,
        help_text='A unique key with the configuration entry name'
    )

    description = models.TextField(
        default='',
        help_text='Further optional description of the configuration entry'
    )

    value = models.CharField(
        max_length=200,
        default='',
        help_text='The value of the configuration entry'
    )

    @classmethod
    def get(cls, key: str) -> str:
        item = get_unique_or_none(Configuration, key=key)
        if item:
            return item.value
        return ''

    @classmethod
    def set(cls, key: str, value: str):
        item = get_unique_or_none(Configuration, key=key)
        if item:
            if item.value == value:
                return

        if not item:
            item = Configuration()
            item.key = key

        item.value = value
        item.save()

    @classmethod
    def update_configs(cls):
        for config in Configs:
            for key, value in config.default_values.items():
                item = get_unique_or_none(Configuration, key=key)
                if not item:
                    item = Configuration()
                    item.key = key
                item.value = value
                item.save()

    def __str__(self):
        return f'{self.key}={self.value}'
