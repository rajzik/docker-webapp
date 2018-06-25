from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    friends = models.ManyToManyField(
        'self',
        through="UserFriends",
        through_fields=('user1', 'user2'),
        symmetrical=False
    )

    messages = models.ManyToManyField(
        'Message',
        through='UserMessages',
        through_fields=('user1', 'message')
    )

    rooms = models.ManyToManyField(
        'Room',
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
    date_created = models.DateTimeField(auto_now=True)

## Join table
## Joining user with messages
class UserMessages(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(
        User, related_name='user1_id', on_delete=models.CASCADE)
    user2 = models.ForeignKey(
        User, related_name='user2_id', on_delete=models.CASCADE)
    message = models.ForeignKey('Message', on_delete=models.CASCADE)

## Join table
## Joining group with messages
class GroupMessage(models.Model):
    id = models.AutoField(primary_key=True)
    message = models.CharField(max_length=550)
    time = models.DateTimeField(auto_now=True)
    from_user = models.ForeignKey(User, on_delete=models.CASCADE)


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(
        User, related_name='from_user_id', on_delete=models.CASCADE)
    to_user = models.ForeignKey(
        User, related_name='to_user_id', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)
    message = models.CharField(max_length=550)


class Room(models.Model):
    id = models.AutoField(primary_key=True)
    room_name = models.CharField(max_length=50)
    last_active = models.DateTimeField(auto_now=True)
    date_created = models.DateTimeField(auto_now=True)
    users = models.ManyToManyField(User, through='UserRooms')
    room_messages = models.ManyToManyField('GroupMessage', through='RoomMessages')

class RoomMessages(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    room_message = models.ForeignKey(GroupMessage, on_delete=models.CASCADE)

class UserRooms(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    is_admin = models.BooleanField()
