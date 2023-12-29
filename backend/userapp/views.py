from rest_framework.response import Response
from rest_framework.views import APIView
from random import randint
from rest_framework.permissions import AllowAny
# app imports
from .models import CustomUser, UserVerification
from .utils import sendRegistrationOTP, sendResetOTP
from .serializers import UserSerializerForPanel

# sign in view
class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data['email']
        otp = randint(100000, 999999)
    
        # check if user already exists, if yes then return else, move on
        try:
            CustomUser.objects.get(email = email)
            return Response(data={"message" : "User already exists, please reset password"}, status=400)
        except:
            pass
        
        # send email and add entry to UserVerification table
        try:
            sendRegistrationOTP(otp=otp, to_email=email)
            unverified_user, created = UserVerification.objects.get_or_create(email = email)
            unverified_user.otp = otp
            unverified_user.save()
            return Response(data= {"message":"OTP sent on email, please verify account"}, status=200)
        except Exception as e:
            return Response(data = {"message":"Something went wrong, please try again"}, status=400)

class UserVerifyView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data['email']

        # check if user already exists
        try:
            CustomUser.objects.get(email = email)
            return Response(data= {"message" : "User already exists, please reset password"}, status=400)
        except Exception as e:
            print(e)
            pass

        password = request.data['password']
        otp = request.data['otp']

        # check if email is in user verify view
        try:
            unverified_user = UserVerification.objects.get(email=email, otp=otp)
            verified_user = CustomUser.objects.create(username = email, email= email)
            verified_user.set_password(password)
            verified_user.save()
            unverified_user.delete()
            return Response(data={"message":"Account Created Successfully"}, status=200)
            
        except:
            return Response(data={"message":"Invalid OTP or email"}, status=400)


class UserPasswordResetView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email =request.data['email']
        otp = randint(100000, 999999)

        # check if already exists, if not exists return 404
        try:
            user = CustomUser.objects.get(email=email)
        except:
            return Response(data={"message":"User dose not exists, please Register"}, status=400)

        # send otp email, add entry to UserVerification table
        try:
            sendResetOTP(otp=otp, to_email=email)
            unverified_user, created = UserVerification.objects.get_or_create(email=email)
            unverified_user.otp = otp
            unverified_user.save()
            return Response(data= {"message":"OTP sent on email, please verify account"}, status=200)
        except Exception as e:
            print(e)
            return Response(data={"message":"Something went wrong, please try again"}, status=400)


class UserReverifyView(APIView):
    permission_classes = []
    def post(self, request):
        email = request.data['email']
        otp = request.data['otp']
        password = request.data['password']


        # check if email is in UseVerification table
        try:
            unverified_user = UserVerification.objects.get(email=email, otp=otp)
        except:
            return Response(data={"message":"Invalid OTP or email"}, status=400)

        # set new password
        try:
            user = CustomUser.objects.get(email = email)
            user.set_password(password)
            user.save()
            unverified_user.delete()
            return Response(data={"message":"Password reset is successful"}, status=200)
        except:
            return Response(data={"message":"Something went wrong, maybe account dose not exists "}, status=400)


class UserInfoView(APIView):
    def get(self ,request):
        try:
            user = CustomUser.objects.get(email = request.user)
            serialized_user = UserSerializerForPanel(instance=user)
            return Response(serialized_user.data, status=200)
        except Exception as e:
            return Response("something went wrong", status=400)

    def patch(self, request):
        try:
            user = CustomUser.objects.get(email = request.user)
            serialized_user = UserSerializerForPanel(instance=user, data=request.data, partial=True)
            if serialized_user.is_valid():
                serialized_user.save()
                return Response(serialized_user.data, status=200)
            else:
                return Response(serialized_user.errors, status=400)
        except Exception as e:
            print(e)
            return Response("something went wrong", status=400)


