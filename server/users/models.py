from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=62)
    is_superuser = models.BooleanField()
    date_joined = models.TimeField(auto_now=True)
    last_login = models.TimeField()
    friends = models.ManyToManyField('self')
    messages = models.ManyToManyField(
        'Message',
        through='UserMessages',
        through_fields=('user1', 'message')
    )

    class Meta:
        db_table = 'user'


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(User, related_name= 'from_user_id', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name= 'to_user_id', on_delete=models.CASCADE)
    time = models.TimeField(auto_now=True)
    message = models.CharField(max_length=550)
    
    class Meta:
        db_table = 'message'


class UserMessages(models.Model):
    id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(
        User, related_name='user1_id', on_delete=models.CASCADE)
    user2 = models.ForeignKey(
        User, related_name='user2_id', on_delete=models.CASCADE)
    message = models.ForeignKey(Message, on_delete=models.CASCADE)

    class Meta:
        db_table = 'user_messages'
