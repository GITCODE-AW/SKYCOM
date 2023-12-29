from rest_framework.serializers import ModelSerializer
from .models import CustomUser

class UserSerializerForPanel(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "email",
            "phone",
            "sec_phone",
            "first_name",
            "last_name",
            "state",
            "district",
            "city",
            "pincode",
        ]
        read_only_fields = ("email",)