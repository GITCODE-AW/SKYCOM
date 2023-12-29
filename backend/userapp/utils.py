from django.core.mail import send_mail
from django.conf import settings

def sendRegistrationOTP(otp, to_email):
    send_mail (
        subject= "SkyCom Account Registration",
        message= f"one time password (otp) is {otp}",
        recipient_list= [to_email,],
        from_email= settings.EMAIL_HOST_USER
    )

def sendResetOTP(otp, to_email):
    send_mail(
        subject="SkyCom Password Reset",
        message=f"one time password (otp) is {otp}",
        recipient_list= [to_email],
        from_email= settings.EMAIL_HOST_USER
    )