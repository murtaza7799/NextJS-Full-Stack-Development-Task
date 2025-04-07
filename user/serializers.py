from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["username", 'name', 'password', 'email', "city"]

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            name=validated_data['name'],
            password=validated_data['password'], 
            email=validated_data.get('email'),
            city=validated_data.get('city'),
        )
        return user

# class UserDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'email']