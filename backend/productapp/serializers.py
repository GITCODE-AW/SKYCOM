from rest_framework.serializers import ModelSerializer
from .models import Category, Banner, Product

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class BannerSerializer(ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Banner
        fields = "__all__"


class ProductSerializer(ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Product
        fields = [
            "id",
            "category",
            "product_name",
            "product_rating",
            "maximum_price",
            "price",
            "description",
            "image_link",
            "alt_image_link"
        ]