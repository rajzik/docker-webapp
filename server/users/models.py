from django.db import models

""" 
Database models 
"""


class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=62)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(auto_now=True)
    
    friends = models.ManyToManyField('self')

    messages = models.ManyToManyField(
        'Message',
        through='UserMessages',
        through_fields=('user1', 'message')
    )

    rooms = models.ManyToManyField(
        'Room',
        through='UserRooms'
    )

    class Meta:
        db_table = 'user'


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(
        User, related_name='from_user_id', on_delete=models.CASCADE)
    to_user = models.ForeignKey(
        User, related_name='to_user_id', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)
    message = models.CharField(max_length=550)

    class Meta:
        db_table = 'message'


class Room(models.Model):
    id = models.AutoField(primary_key=True)
    room_name = models.CharField(max_length=50)
    last_active = models.DateTimeField()
    date_created = models.DateTimeField(auto_now=True)
    users = models.ManyToManyField(User, through='UserRooms')
    room_messages = models.ManyToManyField('GroupMessage', through='RoomMessages')
    class Meta:
        db_table = 'room'


class UserMessages(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(
        User, related_name='user1_id', on_delete=models.CASCADE)
    user2 = models.ForeignKey(
        User, related_name='user2_id', on_delete=models.CASCADE)
    message = models.ForeignKey(Message, on_delete=models.CASCADE)

    class Meta:
        db_table = 'user_messages'


class UserRooms(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    is_admin = models.BooleanField()

    class Meta:
        db_table = 'user_rooms'

class GroupMessage(models.Model):
    id = models.AutoField(primary_key=True)
    message = models.CharField(max_length=550)
    time = models.DateTimeField()
    from_user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'group_message'    

class RoomMessages(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    room_message = models.ForeignKey(GroupMessage, on_delete=models.CASCADE)

    class Meta:
        db_table = 'room_messages'
    