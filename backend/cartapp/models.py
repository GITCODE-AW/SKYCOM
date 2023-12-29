from django.db import models
from userapp.models import CustomUser
from productapp.models import Product

class CartItem(models.Model):
    user = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1)

    def __str__(self) -> str:
        return f"{self.user.email} > {self.product.product_name} > {self.quantity}"

    def subTotal(self):
        return self.quantity * self.product.price
