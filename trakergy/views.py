import datetime
import re

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import AccessToken
from .SendEmailNotification import Emailer
from .mails.Email import EmailFactory
from .models import *
from .serializers import *


# Register API

class RegisterAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer
    emailer = Emailer.get_instance()

    def post(self, request):
        serialized = RegisterSerializer(request.data)
        try:
            validated = serialized.validate(request.data)
            serialized.create(validated)
        except Exception as e:
            content = {'message': f'Register error. {e}'}
            return Response(data=content, status=status.HTTP_406_NOT_ACCEPTABLE)
        notification = EmailFactory.createRegisterNotification([request.data['email']], request.data['username'])
        self.emailer.sendEmail(notification)
        content = {'message': 'User successfully added.'}
        return Response(data=content, status=status.HTTP_201_CREATED)


class LogoutAPI(generics.GenericAPIView):
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            tokens = OutstandingToken.objects.filter(user_id=user_id)
            # this deletes refresh token based on user_id from access tokens
            for token in tokens:
                t, _ = BlacklistedToken.objects.get_or_create(token=token)
            #  access tokens can't be deleted, so it's recommended that access lifetime should be short
            return Response(data={"message": "User successfully logout"}, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class SeeCurrentUserAPI(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            serializer = CustomUserSerializer(request.user, context=self.get_serializer_context())
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class EditUsernameAPI(generics.GenericAPIView):
    def patch(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            try:
                username = request.data['username']
                min_chars = 3
                if len(username) > min_chars:
                    user.username = username
                    user.save()
                    content = {'message': 'Username successfully updated.'}
                    return Response(data=content, status=status.HTTP_200_OK)
                else:
                    content = {'message': f"Username too short. At least {min_chars} characters required."}
                    return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class EditEmailAPI(generics.GenericAPIView):
    def patch(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            try:
                email = request.data['email']
                if not self.validateEmail(email):
                    content = {'message': 'Wrong email address'}
                    return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
                user.email = email
                user.save()
                content = {'message': 'Email successfully updated.'}
                return Response(data=content, status=status.HTTP_200_OK)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def validateEmail(self, email):
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if re.fullmatch(regex, email):
            return True
        return False


class EditPasswordAPI(generics.GenericAPIView):
    def patch(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            try:
                password1 = request.data['password1']
                password2 = request.data['password2']
                if password1 == password2:
                    try:
                        validate_password(password1)
                        user.set_password(password1)
                        user.save()
                        content = {'message': 'Password successfully updated.'}
                        return Response(data=content, status=status.HTTP_200_OK)
                    except Exception as e:
                        content = {'message': e}
                        return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
                else:
                    content = {'message': 'Passwords don\'t match'}
                    return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class PersonalExpensesYearsAPI(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            try:
                curr_user_id = user.id
                user_expenses = Expense.objects.filter(users_to_split__in=[curr_user_id])
                years = list(set([e.date.year for e in user_expenses]))
                years.sort(reverse=True)

                return Response(data=years, status=status.HTTP_200_OK)

            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class PersonalExpensesByTypeAPI(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            try:
                if 'noOfYears' not in request.query_params:
                    raise Exception()

                today_year = datetime.date.today().year
                no_of_years = int(request.query_params['noOfYears'])
                years = list(range(today_year - no_of_years + 1, today_year + 1))

                res = []
                for y in years:
                    # to calculate the sum of current user's expenses
                    # get all the expenses that the current user must pay
                    curr_user_id = user.id
                    user_expenses = Expense.objects.filter(users_to_split__in=[curr_user_id], date__year=y)
                    amounts_to_pay = dict()

                    # for each expense that the current user must pay,
                    # get his actual sum to pay for the respective expense
                    for e in user_expenses:
                        curr_eid = e.id
                        curr_e_amount = e.amount

                        # get the ids of the users that must pay the current expense
                        users_to_split = CustomUser.objects.filter(expenses__in=user_expenses.filter(id=curr_eid))
                        users_to_split_ids = [u.id for u in users_to_split]

                        # calculate how many users must pay the expense
                        split_into = users_to_split.count()

                        tag_name = Tag.objects.get(id=e.tag_id).name

                        # add the tag if it does not exist
                        if tag_name not in amounts_to_pay:
                            amounts_to_pay[tag_name] = []

                        # make an array of all individual expense value for a tag
                        if curr_user_id in users_to_split_ids:
                            amounts_to_pay[tag_name].append(float(curr_e_amount / split_into))
                    # calculate the sum for each tag
                    for k in amounts_to_pay:
                        amounts_to_pay[k] = sum(amounts_to_pay[k])
                    # create the response object
                    amounts = []
                    for a in amounts_to_pay:
                        tag_name = a
                        total_sum = amounts_to_pay[a]
                        if total_sum > 0:
                            amounts.append({"tag_name": tag_name, "sum": total_sum})

                    res.append({"year": y, "amounts": amounts})

                return Response(data=res, status=status.HTTP_200_OK)

            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class PersonalExpensesByTypeByMonthAPI(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            try:
                curr_user_id = user.id
                user_expenses = Expense.objects.filter(users_to_split__in=[curr_user_id])
                years = list(set([e.date.year for e in user_expenses]))
                years.sort(reverse=True)

                amounts = dict()

                for selected_year in years:
                    # to calculate the sum of current user's expenses
                    # get all the expenses that the current user must pay
                    curr_user_id = user.id
                    user_expenses = Expense.objects.filter(users_to_split__in=[curr_user_id], date__year=selected_year)
                    amounts_to_pay = dict()

                    # for each expense that the current user must pay,
                    # get his actual sum to pay for the respective expense
                    for e in user_expenses:
                        curr_eid = e.id
                        curr_e_amount = e.amount

                        # get the ids of the users that must pay the current expense
                        users_to_split = CustomUser.objects.filter(expenses__in=user_expenses.filter(id=curr_eid))
                        users_to_split_ids = [u.id for u in users_to_split]

                        # calculate how many users must pay the expense
                        split_into = users_to_split.count()

                        tag_name = Tag.objects.get(id=e.tag_id).name

                        # add the tag if it does not exist
                        if tag_name not in amounts_to_pay:
                            amounts_to_pay[tag_name] = dict()

                        # make an array of all individual expense value for a tag
                        if curr_user_id in users_to_split_ids:
                            if e.date.month not in amounts_to_pay[tag_name]:
                                amounts_to_pay[tag_name][e.date.month] = []
                            amounts_to_pay[tag_name][e.date.month].append(float(curr_e_amount / split_into))

                    # calculate the sum for each tag
                    for tag in amounts_to_pay:
                        for month in amounts_to_pay[tag]:
                            amounts_to_pay[tag][month] = sum(amounts_to_pay[tag][month])

                    if selected_year not in amounts:
                        amounts[selected_year] = []

                    # create the response object
                    for tag in amounts_to_pay:
                        for month in amounts_to_pay[tag]:
                            total_sum = amounts_to_pay[tag][month]
                            if total_sum > 0:
                                amounts[selected_year].append({"tag_name": tag, "month": month, "sum": total_sum})

                    amounts[selected_year] = sorted(amounts[selected_year], key=lambda d: d['month'])

                return Response(data=amounts, status=status.HTTP_200_OK)

            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class PersonalExpensesForUserYearsAPI(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            try:
                curr_user_id = user.id
                user_expenses = Expense.objects.filter(users_to_split__in=[curr_user_id])
                years = list(set([e.date.year for e in user_expenses]))
                years.sort(reverse=True)

                grouped_by_day = dict()

                for y in years:
                    year_data = Expense.objects.filter(date__year=y, users_to_split__in=[curr_user_id])
                    for expense in year_data:
                        expense_date = str(expense.date)
                        expense_id = expense.id
                        if expense_date not in grouped_by_day:
                            grouped_by_day[expense_date] = 0

                        users_to_split = CustomUser.objects.filter(expenses__in=user_expenses.filter(id=expense_id))

                        split_into = users_to_split.count()
                        grouped_by_day[expense_date] += expense.amount / split_into

                return Response(data=grouped_by_day, status=status.HTTP_200_OK)

            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class PersonalExpensesPerCountryAPI(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)

            try:
                user_id = user.id
                expenses = Expense.objects.filter(users_to_split__in=[user_id])
                res = dict()

                for exp in expenses:
                    eid = exp.id
                    users_to_split = CustomUser.objects.filter(expenses__in=expenses.filter(id=eid))
                    split_into = users_to_split.count()

                    # expense amount
                    amount = exp.amount / split_into
                    # country code
                    country_code = exp.trip.location.code
                    if country_code not in res:
                        res[country_code] = 0

                    res[country_code] += amount

                return Response(data=res, status=status.HTTP_200_OK)
            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class TripAPI(generics.GenericAPIView):
    def patch(self, request, trip_id):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            if trip_id is None:
                return Response(data={'message': "Missing parameter trip_id"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                trip = Trip.objects.get(id=trip_id)
            except ObjectDoesNotExist:
                return Response(data={'message': f"Wrong trip id: {trip_id}"}, status=status.HTTP_400_BAD_REQUEST)
            if trip.admin is None or trip.admin.id != user_id:
                return Response(data={'message': "Current user is not the admin of this trip"},
                                status=status.HTTP_403_FORBIDDEN)

            serializer = TripUpsertSerializer(trip, data=request.data, partial=True, context={'request': request})
            if serializer.is_valid():
                if 'members' in request.data and user_id not in request.data['members']:
                    return Response(data={'message': "Wrong trip id: admin member can't be removed"},
                                    status=status.HTTP_400_BAD_REQUEST)
                if 'from_date' in request.data and 'to_date' not in request.data and request.data[
                    'from_date'] > trip.to_date.strftime("%Y-%m-%d"):
                    return Response(data={'message': "Start date must be lower than end date"},
                                    status=status.HTTP_400_BAD_REQUEST)
                if 'to_date' in request.data and 'from_date' not in request.data and request.data[
                    'to_date'] < trip.from_date.strftime("%Y-%m-%d"):
                    return Response(data={'message': "End date must be grater than start date"},
                                    status=status.HTTP_400_BAD_REQUEST)
                serializer.save()
                details_serializer = TripDetailSerializer(trip)
                return Response(data=details_serializer.data, status=status.HTTP_200_OK)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, trip_id):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']

            if trip_id is None:
                return Response(data={'message': "Missing parameter trip_id"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                trip = Trip.objects.get(id=trip_id)
            except ObjectDoesNotExist:
                return Response(data={'message': f"Wrong trip id: {trip_id}"}, status=status.HTTP_400_BAD_REQUEST)
            if trip.admin is None or trip.admin.id != user_id:
                return Response(data={'message': "Current user is not the admin of this trip"},
                                status=status.HTTP_403_FORBIDDEN)

            trip.delete()
            return Response(data={'message': 'Successfully deleted trip'}, status=status.HTTP_200_OK)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def get(self, request, trip_id):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']

            if trip_id is None:
                return Response(data={'message': "Missing parameter trip_id"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                trip = Trip.objects.get(id=trip_id)
            except ObjectDoesNotExist:
                return Response(data={'message': f"Wrong trip id: {trip_id}"}, status=status.HTTP_400_BAD_REQUEST)

            trips = Trip.objects.filter(members__in=[user_id])
            if trip not in trips:
                return Response(data={'message': "Not a member of this trip"}, status=status.HTTP_403_FORBIDDEN)

            trip_data = TripDetailSerializer(trip).data
            # get trip expenses info: all expenses list
            # for an expense: basic info, users to split (ids), payer (id), tag
            expenses = Expense.objects.filter(trip_id=trip_id)
            expenses_ser = []
            for exp in expenses:
                serializer = TagSerializer(exp.tag)
                tag_ser = serializer.data
                serializer = ExpenseSerializer(exp)
                exp_ser = serializer.data
                exp_ser['tag'] = tag_ser
                expenses_ser.append(exp_ser)

                # add the expenses to the response
                trip_data['expenses'] = expenses_ser

            return Response(data=trip_data, status=status.HTTP_200_OK)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class UserTripsAPI(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']

            try:
                trips = Trip.objects.filter(members__in=[user_id])

                res = []
                for trip in trips:
                    serializer = TripSerializer(trip)
                    trip_ser = serializer.data
                    res.append(trip_ser)

                return Response(data=res, status=status.HTTP_200_OK)
            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class ExpensesForSpecificTrips(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            try:
                body_trips = request.GET.getlist('tripId')
                body_trips = [int(i) for i in body_trips]
                expenses = Expense.objects.filter(trip_id__in=body_trips)
                res = []
                for expense in expenses:
                    serializer = ExpenseSerializer(expense)
                    res.append(serializer.data)

                return Response(data=res, status=status.HTTP_200_OK)
            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class CreateTripAPI(generics.GenericAPIView):
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)  # the user that adds the trip is the admin
            serializer = TripUpsertSerializer(data=request.data)
            if serializer.is_valid():
                # create trip
                data = serializer.data
                new_trip = Trip.objects.create(name=data['name'], from_date=data['from_date'], description=data['description'], 
                                               image_url=data['image_url'], to_date=data['to_date'])
                new_trip.location = Location.objects.get(id=data['location'])
                new_trip.admin = user
                new_trip.members.add(user)
                # save trip members
                if 'members' in data:
                    for member_id in data['members']:
                        new_member = CustomUser.objects.get(id=member_id)
                        new_trip.members.add(new_member)
                new_trip.save()
                output = TripDetailSerializer(new_trip)
                return Response(data=output.data, status=status.HTTP_201_CREATED)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class AddUsersToTrip(generics.GenericAPIView):
    def post(self, request, trip_id):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            if trip_id is None:
                return Response(data={'message': "Missing parameter trip_id"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                trip = Trip.objects.get(id=trip_id)
            except ObjectDoesNotExist:
                return Response(data={'message': f"Wrong trip id: {trip_id}"}, status=status.HTTP_400_BAD_REQUEST)
            if trip.admin is None or trip.admin.id != user_id:
                return Response(data={'message': "Current user is not the admin of this trip"},
                                status=status.HTTP_403_FORBIDDEN)
            if 'user_id' not in request.data:
                return Response(data={'message': "Required parameter user_id missing"},
                                status=status.HTTP_400_BAD_REQUEST)
            try:
                user_to_add = CustomUser.objects.get(id=request.data['user_id'])
            except ObjectDoesNotExist:
                return Response(data={'message': f"Wrong user id: {request.data['user_id']}"},
                                status=status.HTTP_400_BAD_REQUEST)
            count = trip.members.filter(id=request.data['user_id']).count()
            if count != 0:
                return Response(data={'message': "User is already part of the trip"},
                                status=status.HTTP_400_BAD_REQUEST)
            trip.members.add(user_to_add)
            trip.save()
            serializer = TripDetailSerializer(trip)
            return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, trip_id):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            if trip_id is None:
                return Response(data={'message': "Missing parameter trip_id"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                trip = Trip.objects.get(id=trip_id)
            except ObjectDoesNotExist:
                return Response(data={'message': f"Wrong trip id: {trip_id}"}, status=status.HTTP_400_BAD_REQUEST)
            if trip.admin is None or trip.admin.id != user_id:
                return Response(data={'message': "Current user is not the admin of this trip"},
                                status=status.HTTP_403_FORBIDDEN)
            if 'user_id' not in request.data:
                return Response(data={'message': "Required parameter user_id missing"},
                                status=status.HTTP_400_BAD_REQUEST)
            try:
                user_to_remove = CustomUser.objects.get(id=request.data['user_id'])
            except ObjectDoesNotExist:
                return Response(data={'message': f"Wrong user id: {request.data['user_id']}"},
                                status=status.HTTP_400_BAD_REQUEST)
            if request.data['user_id'] == trip.admin.id:
                return Response(data={'message': "Can't remove admin from the trip"},
                                status=status.HTTP_400_BAD_REQUEST)
            count = trip.members.filter(id=request.data['user_id']).count()
            if count == 0:
                return Response(data={'message': "User is not part of the trip"}, status=status.HTTP_400_BAD_REQUEST)
            trip.members.remove(user_to_remove)
            trip.save()
            serializer = TripDetailSerializer(trip)
            return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)  
        
class LocationsAPI(generics.ListAPIView):
    """
    Handles the read of Location objects.
    """
    def list(self, request, *args, **kwargs):
        """
        Reads the locations.
        """
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']

            try:
               queryset = Location.objects.all()
               serializer = LocationSerializer(queryset, many=True)
               return Response(data = serializer.data, status=status.HTTP_200_OK)
            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)
        
class TagAPI(generics.ListAPIView):
    """
    Handles the read of Tag objects.
    """
    def list(self, request, *args, **kwargs):
        """
        Reads the tags.
        """
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']

            try:
               queryset = Tag.objects.all()
               serializer = TagSerializer(queryset, many=True)
               return Response(data = serializer.data, status=status.HTTP_200_OK)
            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)
        
class UsersAPI(generics.ListAPIView):
    """
    Handles the read of User objects.
    """
    def list(self, request, *args, **kwargs):
        """
        Reads the users.
        """
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']

            try:
               queryset = CustomUser.objects.all()
               serializer = CustomUserSerializer(queryset, many=True)
               return Response(data = serializer.data, status=status.HTTP_200_OK)
            except Exception:
                return Response(data={'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)
  
class ExpenseAPI(generics.GenericAPIView):
    emailer = Emailer.get_instance()

    def post(self, request, trip_id):
        """
        Current logged in user adds an expense.
        If "members" key is not present in body => the expense it's only for himself/herself
        """
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        access_token_obj = AccessToken(token)
        user_id = access_token_obj['user_id']  # current user adds an expense
        logged_in_user = CustomUser.objects.get(id=user_id)
        if trip_id is None:
            return Response(data={'message': "Missing parameter trip_id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            trip = Trip.objects.get(id=trip_id)
        except ObjectDoesNotExist:
            return Response(data={'message': f"Wrong trip id: {trip_id}"}, status=status.HTTP_400_BAD_REQUEST)

        count = trip.members.filter(id=user_id).count()
        if count == 0:
            return Response(data={'message': "User is not part of the trip"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ExpenseUpsertSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            if 'tag' not in data:
                return Response(data={'message': "Required key tag missing"},
                                status=status.HTTP_400_BAD_REQUEST)
            # validate date
            start_date = trip.from_date.strftime("%Y-%m-%d")
            end_date = trip.to_date.strftime("%Y-%m-%d")
            members = []
            emails = []
            payer = CustomUser.objects.get(id=data['payer'])
            if data['date'] < start_date or data['date'] > end_date:
                return Response(data={'message': f"Incorrect date must be after {start_date} and before {end_date}"},
                                status=status.HTTP_400_BAD_REQUEST)
            # validate members
            if 'users_to_split' in data:
                for member_id in data['users_to_split']:
                    count = trip.members.filter(id=member_id).count()
                    user = CustomUser.objects.get(id=member_id)
                    if count == 0:
                        return Response(data={'message': "User is not part of the trip"},
                                        status=status.HTTP_400_BAD_REQUEST)
                    if member_id == payer.id:
                        continue
                    members.append(user)
                    emails.append(user.email)
            # create expense
            description = '' if 'description' not in data else data['description']
            tag = Tag.objects.get(id=data['tag'])
            new_expense = Expense(amount=data['amount'], date=data['date'], trip=trip, description=description, tag=tag)
            new_expense.save()
            new_expense.payer = payer

            if len(members) != 0:
                new_expense.users_to_split.set(members)
                # send email notification
                notification = EmailFactory.createNotification(emails, logged_in_user .username,
                                                               logged_in_user .first_name + ' ' + logged_in_user.last_name,
                                                               trip.name, data['amount'], tag.name, description)
                self.emailer.sendEmail(notification)
            new_expense.save()
            details = ExpenseDetailsSerializer(new_expense)
            return Response(data=details.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # TODO Radu -- add delete/update expense