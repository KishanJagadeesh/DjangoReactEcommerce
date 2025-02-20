from rest_framework import serializers
from django.contrib.auth.models import User
from ecomm.models import Product ,ShippingAddress,Order,OrderItem,Review
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model =User
        fields =['id', '_id','username','email','name','isAdmin']

    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff
    
    def get_name(self,obj):
        name=obj.first_name
        if name=='':
            name=obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model =User
        fields =['id', '_id','username','email','name','isAdmin','token']

    def get_token(self, obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model =Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model =Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews=obj.review_set.all()
        serializer=ReviewSerializer(reviews, many=True)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model =ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model =OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems=serializers.SerializerMethodField(read_only=True)
    shippingAddress=serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model =Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer=OrderItemSerializer(items,many=True)
        return serializer.data
    
    def get_shippingAddress(self, obj):
        try:
# In Django, when you define a ForeignKey field in a model, the related model's name is used in lowercase when accessing it through an instance of the model containing the ForeignKey field.

# In the Order model, there is a ForeignKey field called shippingAddress that relates to the ShippingAddress model. When you access this field through an instance of the Order model, you use lowercase shippingaddress, not shippingAddress, to refer to it.

# So, obj.shippingaddress is used to access the related ShippingAddress instance associated with the Order instance (obj). This is a convention followed by Django to maintain consistency and simplicity in accessing related objects.
            
            address=ShippingAddressSerializer(obj.shippingaddress,many=False ).data
        except:
            address=False
        return address 
    
    def get_user(self, obj):
        user =obj.user
        serializer =UserSerializer(user, many =False)
        return serializer.data
    

