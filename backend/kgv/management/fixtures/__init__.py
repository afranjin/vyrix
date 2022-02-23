# -*- coding: utf-8 -*-
import typing
import os
import yaml


def load_fixture(fixture: str) -> typing.List[typing.Dict]:

    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
    filename = fixture + '.yaml'

    with open(os.path.join(path, filename)) as f:
        result = yaml.load(f, Loader=yaml.FullLoader)

    return result[fixture]
