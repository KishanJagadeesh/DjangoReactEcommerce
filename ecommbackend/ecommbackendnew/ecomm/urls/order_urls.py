from django.urls import path
from ecomm.views import order_views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [
   path('add/',views.addOrderItems, name='add-order'),
   path('',views.getOrders, name='get-all-order'),
   path('myorders/',views.getMyOrders, name='get-my-order'),
   path('<str:pk>/',views.getOrderById, name='get-order'),
   path('<str:pk>/pay/',views.updateOrderToPaid, name='update-orderto-paid'),
   path('<str:pk>/deliver/',views.updateOrderToDelivered, name='update-orderto-delivered'),
]