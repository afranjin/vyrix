# -*- coding: utf-8 -*-
from kgv.models import ConfigEmail, Configuration


class MailClient(object):

    SenderAddress = None
    SenderPassword = None
    SMTPHost = None
    SMTPPort = None

    @classmethod
    def setup_client(cls):
        cls.SenderAddress = Configuration.get(ConfigEmail.SenderAddress)
        cls.SenderPassword = Configuration.get(ConfigEmail.SenderPassword)
        cls.SMTPHost = Configuration.get(ConfigEmail.SMTPHost)
        cls.SMTPPort = Configuration.get(ConfigEmail.SMTPPort)
