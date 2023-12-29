from django.contrib import admin
from django.urls import path, include
from userapp.urls import urlpatterns as userapp_urls
from productapp.urls import urlpatterns as productapp_urls
from cartapp.urls import urlpatterns as cartapp_urls
from ordersapp.urls import urlpatterns as ordersapp_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include(userapp_urls)),
    path('product/', include(productapp_urls)),
    path('cart/', include(cartapp_urls)),
    path('orders/', include(ordersapp_urls))
] 
