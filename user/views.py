import logging
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

logger = logging.getLogger(__name__)

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        logger.info("User registration request received")
        logger.debug(f"Request data: {request.data}")
        logger.info("Creating user")

        if not request.data.get('username'):
            logger.error("Username is required")
            return Response({ "MessageCode":"Username is required","MessageDescription":""}, status=status.HTTP_400_BAD_REQUEST)
        if not request.data.get('password'):
            logger.error("Password is required")
            return Response({ "MessageCode":"Password is required","MessageDescription":""}, status=status.HTTP_400_BAD_REQUEST)
        if not request.data.get('email'):
            logger.error("Email is required")
            return Response({ "MessageCode":"Email is required","MessageDescription":""}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
           serializer.save()
           return Response({ "MessageCode":"User Created","MessageDescription":"New User Created Successfully"}, status=status.HTTP_201_CREATED)
        return Response({ "MessageCode":"Something Went Wrong!","MessageDescription":"Please Try Again later", "error" :serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

       
    