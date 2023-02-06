import smtplib


class Emailer:
    __shared_instance = None
    smtp_session = smtplib.SMTP_SSL('smtp.mail.yahoo.com', 465)

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

    def authenticate(self):
        try:
            # Authentication
            Emailer.smtp_session.login("", "")
        except Exception as e:
            print(str(e))

    def sendEmail(self, dest, username, fullname, tripname, amount):
        message = f"{username} "
        if len(fullname.strip()):
            message += f"({fullname}) "
        message += f"has just added a new expense of {amount} in the trip: {tripname}"
        try:
            print(Emailer.smtp_session.password)
            Emailer.smtp_session.sendmail("sender_email_id", dest, message)
        except Exception as e:
            print(str(e))


