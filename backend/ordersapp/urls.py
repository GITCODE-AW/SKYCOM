from django.urls import path
from .views import OrderItemView, OrderAllItemView, CancelOrderItem

urlpatterns = [
    path('get-all/', OrderItemView.as_view()),
    path('order-all/', OrderAllItemView.as_view()),
    path('cancel-one/', CancelOrderItem)
]