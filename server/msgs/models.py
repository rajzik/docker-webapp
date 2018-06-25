from django.conf import settings
from django.db import models


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='from_user_id', on_delete=models.CASCADE)
    to_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='to_user_id', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    message = models.CharField(max_length=550)

