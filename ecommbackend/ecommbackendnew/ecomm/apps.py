from django.apps import AppConfig
from django.core.signals import request_finished


class EcommConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ecomm'
    def ready(self):
        import ecomm.signals