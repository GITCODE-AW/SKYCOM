from django.db import models

class Category(models.Model):
    category_name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.category_name

# banner for specific category
class Banner(models.Model):
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=15)
    heading = models.CharField(max_length=15)
    starting_price = models.PositiveIntegerField()
    image_link = models.CharField(max_length=500)

    def __str__(self) -> str:
        return self.category.category_name

class Product(models.Model):
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=200)
    product_rating = models.PositiveSmallIntegerField(default=0)
    maximum_price = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    description = models.TextField(max_length=500)
    dod_stat = models.BooleanField(default=False)
    fsale_stat = models.BooleanField(default=False)
    featured_stat = models.BooleanField(default=False)
    image_link = models.CharField(max_length=500)
    alt_image_link = models.CharField(max_length=500)

    def __str__(self) -> str:
        return self.product_name