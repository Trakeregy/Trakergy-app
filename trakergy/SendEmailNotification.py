import smtplib

from django.core.mail import send_mail

from trakergy.mails import Email
from trakergy.settings import EMAIL_HOST_USER


class Emailer:
    __shared_instance = None

    def __init__(self):
        """virtual private constructor"""
        if Emailer.__shared_instance is None:
            Emailer.__shared_instance = self
        else:
            raise Exception("Emailer class already instantiated!")

    @staticmethod
    def get_instance():
        """static Access Method"""
        if not Emailer.__shared_instance:
            Emailer()  # no object has been created yet
        return Emailer.__shared_instance

    def sendEmail(self, email: Email):
        send_mail(
            email.getTitle(),
            email.getBody(),
            EMAIL_HOST_USER,
            email.getRecipients(),
            fail_silently=False)
