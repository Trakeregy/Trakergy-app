class Email:
    __title: str = ""
    __body: str = ""
    __recipients: list[str] = []

    def getTitle(self) -> str:
        return self.__title

    def getBody(self) -> str:
        return self.__body

    def getRecipients(self) -> list[str]:
        return self.__recipients

    def addRecipient(self, recipient: str):
        self.__recipients.append(recipient)
        return self

    def addRecipients(self, recipients: list[str]):
        self.__recipients.extend(recipients)
        return self

    def withTitle(self, title: str):
        self.__title = title
        return self

    def withBody(self, body: str):
        self.__body = body
        return self


class NotificationEmail(Email):
    def __init__(self, dest, username, fullname, tripname, amount, tag, description):
        message = f"{username} "
        if len(fullname.strip()):
            message += f"({fullname}) "
        message += f"has just added a new expense of {amount} in the trip: {tripname}\n"
        message += f"Details:\n - expense tag: {tag}\n - description: {description}\n"
        self.withTitle('New expense added for your trip').withBody(message).addRecipients(dest)


class RegisterNotification(Email):
    def __init__(self, dest, username):
        message = f"Hello, {username}!\n Thank you for joining us! Now you can easily manage our trip expenses.\n" \
                  f"Add a trip, add members, track expenses and don't forget to have fun!"
        self.withTitle('Welcome to trakergy app!').withBody(message).addRecipients(dest)


class EmailFactory:
    @staticmethod
    def createRegisterNotification(dest, username) -> Email:
        return RegisterNotification(dest, username)

    @staticmethod
    def createNotification(dest, username, fullname, tripname, amount, tag, description) -> Email:
        return NotificationEmail(dest, username, fullname, tripname, amount, tag, description)

