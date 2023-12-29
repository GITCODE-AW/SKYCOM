from django.urls import path
from .views import (
    BannerListView, 
    CategoryListView, 
    GetProductsByCategory, 
    ProductListView, 
    ProductDetailView,
    DealOfDayView,
    SearchProductView
)

urlpatterns = [
    path('banner-list/', BannerListView.as_view()),
    path('category-list/', CategoryListView.as_view()),
    path('product-list/', ProductListView.as_view()),
    path('products-by-category/<int:pk>/', GetProductsByCategory.as_view()),
    path('product-detail/<int:pk>/', ProductDetailView.as_view()),
    path('featured-list/', DealOfDayView.as_view()),
    path('search-product/<str:search_query>/', SearchProductView.as_view())
]
