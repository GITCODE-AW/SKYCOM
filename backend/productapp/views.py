from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Banner, Product, Category
from .serializers import BannerSerializer, CategorySerializer, ProductSerializer
from baseapp.permissions import IsAdminOrReadOnly
from rest_framework.permissions import AllowAny
from django.db.models import Q


class DealOfDayView(ListAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Product.objects.filter(dod_stat = True)
    serializer_class = ProductSerializer

class BannerListView(ListAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer


class CategoryListView(ListAPIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ProductListView(ListAPIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductListView(ListAPIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class GetProductsByCategory(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request, pk):
        products = Product.objects.filter(category_id = pk)
        serialized_products = ProductSerializer(instance=products, many=True)
        return Response(serialized_products.data, status=200)

class ProductDetailView(RetrieveAPIView):
    permission_classes = [IsAdminOrReadOnly]
    def get(self, request, pk):
        product = Product.objects.get(id=pk)
        serialized_product = ProductSerializer(instance=product)
        return Response(serialized_product.data, status=200)


class SearchProductView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    def get(self, request, search_query):
        try:
            queryset = Product.objects.filter(product_name__icontains=search_query)
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(e)