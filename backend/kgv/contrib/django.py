# -*- coding: utf-8 -*-


def get_unique_or_none(model, **kwargs):
    """Returns the unique value for get or None, if multiple objects are found exceptions are raise only the
    exception for not exist is catched.
    """
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None
