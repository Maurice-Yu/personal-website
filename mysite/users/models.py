from django.db import models
import bcrypt
# Create your models here
class Users(models.Model):
    username = models.CharField(max_length=20)
    passwordHash = models.CharField(max_length=200)

    def setPassword(self, password):
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_bytes, salt).decode('utf-8')
        self.passwordHash = hashed_password
    def check_password(self, password):
        password_bytes = password.encode('utf-8')
        hashed_password_bytes = self.passwordHash.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hashed_password_bytes)
