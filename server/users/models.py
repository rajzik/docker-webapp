from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings


class User(AbstractUser):
    friends = models.ManyToManyField(
        'self',
        through="UserFriends",
        through_fields=('user1', 'user2'),
        symmetrical=False
    )

    messages = models.ManyToManyField(
        'msgs.Message',
        through='UserMessages',
        through_fields=('user1', 'message')
    )

    rooms = models.ManyToManyField(
        'rooms.Room',
        through='UserRooms'
    )

class UserFriends(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(
        User, 
        related_name='user1', 
        on_delete=models.CASCADE
        )
    user2 = models.ForeignKey(
        User, 
        related_name='user2', 
        on_delete=models.CASCADE
        )
    created = models.DateTimeField(auto_now=True)

class UserMessages(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(
        User, related_name='user1_id', on_delete=models.CASCADE)
    user2 = models.ForeignKey(
        User, related_name='user2_id', on_delete=models.CASCADE)
    message = models.ForeignKey('msgs.Message', on_delete=models.CASCADE)


class UserRooms(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room = models.ForeignKey('rooms.Room', on_delete=models.CASCADE)
    is_admin = models.BooleanField()
