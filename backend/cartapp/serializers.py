from rest_framework.serializers import ModelSerializer
from .models import CartItem
from productapp.serializers import ProductSerializer

class CartItemSerializer(ModelSerializer):
    product = ProductSerializer()
    class Meta:
        fields = [
            'id',
            'product',
            'quantity'
        ]
        model = CartItem
