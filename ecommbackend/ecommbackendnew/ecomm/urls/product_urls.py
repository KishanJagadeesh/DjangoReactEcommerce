from django.urls import path
from ecomm.views import product_views as views
from ecomm.views.product_views import ( getProduct,
  getProducts,createProducts,deleteProduct ,updateProduct,
  uploadImage, createProductReview)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [
    path('', getProducts, name='getproducts' ),
    path('<str:pk>/reviews/', createProductReview, name='createproductreview' ),
    path('<str:pk>/', getProduct, name='getproduct' ),
    path('create', createProducts, name='createproducts'),
    path('upload', uploadImage, name='uploadImage'),
    path('update/<str:pk>/', updateProduct, name='updateproduct' ),
    path('delete/<str:pk>/', deleteProduct, name='deleteproduct' ),
]