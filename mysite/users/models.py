from django.db import models
import bcrypt
# Create your models here
class Users(models.Model):
    username = models.CharField(max_length=20)
    passwordHash = models.CharField(max_length=200)
    animeList=models.JSONField(default={"title":"nothing yet"})
    def setPassword(self, password):
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_bytes, salt).decode('utf-8')
        self.passwordHash = hashed_password
        print(self.passwordHash)

    def check_password(self, password):
        password_bytes = password.encode('utf-8')
        print(self.passwordHash+'test')
        print(self.username+"test2")
        hashed_password_bytes = self.passwordHash.encode('utf-8')
        print(password_bytes)
        print(hashed_password_bytes)
        return bcrypt.checkpw(password_bytes, hashed_password_bytes)
