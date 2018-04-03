from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
import hashlib

""" 
Database models 
"""

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwars):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('Users must have an password')
            

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(hashlib.md5(password.encode("utf")).hexdigest())
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email, password=password
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name', 'last_name']
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=62)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(auto_now=True)
    email = models.CharField(max_length=100)
    
    options = UserManager()

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
    
    def __str__(self):
        return self.email
    
    class Meta:
        db_table = 'user'

User._meta.get_field('email')._unique = True
User._meta.get_field('username')._unique = True

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
    last_active = models.DateTimeField(auto_now=True)
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
    time = models.DateTimeField(auto_now=True)
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
    