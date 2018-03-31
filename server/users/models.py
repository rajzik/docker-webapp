from django.contrib.auth.models import AbstractUser
from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key= True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=62)
    is_superuser = models.BooleanField()
    date_joined = models.TimeField(auto_now= True)
    last_login = models.TimeField()
    friends = models.ManyToManyField('self')

    class Meta:
        db_table = 'user'
