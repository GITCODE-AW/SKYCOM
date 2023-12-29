from django.db import models
from django.contrib.auth.models import AbstractUser

# custom user table
class CustomUser(AbstractUser):
    state = models.CharField(max_length=80, null=True, blank=True)
    district = models.CharField(max_length=80, null=True, blank=True)
    city = models.CharField(max_length=80, null=True, blank=True)
    pincode = models.CharField(max_length=20, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    sec_phone = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self) -> str:
        return self.email

    def update_user(self, data):
        for key, value in data.items():
            if key == 'email' or key == 'password' or key == "is_superuser":
                pass
            else:
                setattr(self, key, value)
        self.save()


# UserVerification table
class UserVerification(models.Model):
    otp = models.CharField(max_length=7)
    email = models.EmailField()
