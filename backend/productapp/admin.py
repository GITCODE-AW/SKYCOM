from django.contrib import admin
from .models import Category, Product, Banner

admin.site.register([
    Category,
    Banner,
    Product
])