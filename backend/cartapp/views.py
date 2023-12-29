from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CartItem
from userapp.models import CustomUser
from .serializers import CartItemSerializer


class CartItemsView(APIView):
    def get(self, request):
        try:
            user = CustomUser.objects.get(email = request.user)
            cart_items = CartItem.objects.filter(user_id = user.id)
            serialized_cart_items = CartItemSerializer(instance=cart_items, many=True)
            return Response(serialized_cart_items.data, status=200)
        except:
            return Response('something went wrong', status=404)

    def post(self, request):
        try:
            user = CustomUser.objects.get(email = request.user)
            product_id = request.data['product_id']

            cart_item, created = CartItem.objects.get_or_create(user=user, product_id=product_id)            
            serialized_cart_item = CartItemSerializer(instance=cart_item)
            return Response({'message':'Item added to cart successfully', 'cart_item':serialized_cart_item.data}, status=200)
        except:
            return Response("something went wrong", status=400)

    def delete(self, request):
        try:
            user = CustomUser.objects.get(email=request.user)
            cart_item_id = request.data['cart_item_id']
            cart_item = CartItem.objects.get(user=user, id=cart_item_id)
            cart_item.delete()
            return Response({"message":'Removed item from cart successfully'}, status=200)
        except:
            return Response({"message":"Cart item not found"}, status=404)

    # patch method to update quantity only, not other fields
    def patch(self, request):
        try:
            user = CustomUser.objects.get(email=request.user)
            cart_item_id = request.data['cart_item_id']
            quantity = request.data['quantity']
            cart_item = CartItem.objects.get(user = user, id=cart_item_id)
            if quantity < 1:
                cart_item.delete()
            else:
                cart_item.quantity = quantity
                cart_item.save()
            return Response('Updated the cart successfully', status=200)
        except Exception as e:
            return Response("failed to update cart, something went wrong", status=400)
