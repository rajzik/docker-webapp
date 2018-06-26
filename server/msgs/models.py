from django.conf import settings
from django.db import models


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='from_user_id', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    message = models.CharField(max_length=550)

class UserMessages(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='user1_id', on_delete=models.CASCADE)
    user2 = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='user2_id', on_delete=models.CASCADE)
    message = models.ForeignKey('Message', on_delete=models.CASCADE)

