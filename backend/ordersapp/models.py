from django.db import models
from userapp.models import CustomUser
from productapp.models import Product

delivery_stat_CHOICES = ( 
    ("ordered", "ordered"), 
    ("shipped", "shipped"), 
    ("delivered", "delivered"), 
    ("cancelled", "cancelled")
)

class OrderItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()
    total_price = models.PositiveIntegerField(blank=True, null=True)
    delivery_stat = models.CharField(
        max_length= 10,
        choices=delivery_stat_CHOICES,
        default='ordered'
    )
    payment_stat = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user.username} > {self.product.product_name} > {self.quantity}"

    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.product.price
        super(OrderItem, self).save(*args, **kwargs)