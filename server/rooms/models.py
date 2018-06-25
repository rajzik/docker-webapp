from django.conf import settings
from django.db import models


class Room(models.Model):
    id = models.AutoField(primary_key=True)
    room_name = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserRooms')
    room_messages = models.ManyToManyField('GroupMessage', through='RoomMessages')
    admin = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='admin_id', on_delete=models.CASCADE)

class UserRooms(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_id', on_delete=models.CASCADE)
    room = models.ForeignKey('rooms.Room', related_name='room_id', on_delete=models.CASCADE)

class RoomMessages(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room = models.ForeignKey('rooms.Room', on_delete=models.CASCADE)
    room_message = models.ForeignKey('GroupMessage', on_delete=models.CASCADE)

## Join table
## Joining group with messages
class GroupMessage(models.Model):
    id = models.AutoField(primary_key=True)
    message = models.CharField(max_length=550)
    created = models.DateTimeField(auto_now=True)
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
