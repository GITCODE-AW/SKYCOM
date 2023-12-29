from rest_framework import serializers
from .models import OrderItem
from productapp.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "product_name",
            "image_link"
        )

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "product",
            "quantity",
            "total_price",
            "delivery_stat",
            "payment_stat",
        )
