from django.db import models

class UserModel(models.Model):
    user_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)