from django.db import transaction
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view

from .serializers import OrderItemSerializer
from userapp.models import CustomUser
from .models import OrderItem
from cartapp.models import CartItem


class OrderItemView(ListAPIView):
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        return OrderItem.objects.filter(user = self.request.user)

class OrderAllItemView(APIView):
    def post(self, request):
        try:
            with transaction.atomic():
                user = CustomUser.objects.get(email = request.user)
                cart_items = CartItem.objects.filter(user = user)
                for cart_item in cart_items:
                    order_item = OrderItem.objects.create(user=user, product=cart_item.product, quantity=cart_item.quantity)
                    order_item.save()
                    cart_item.delete()

                return Response("items added to cart successfully", status=200)
        except:
            return Response("failed to order items", status=200)

@api_view(['POST'])
def CancelOrderItem(request):
    try:
        order_item_id = request.data['order_item_id']
        order_item = OrderItem.objects.get(id=order_item_id)
        order_item.delivery_stat = 'cancelled'
        order_item.save()
        return Response('Cancelled the ordered item', status=200)
    except:
        return Response('something went wrong, please try again', status=400)
