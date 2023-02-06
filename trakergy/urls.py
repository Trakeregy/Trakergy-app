"""trackergy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from trakergy.views import (
    RegisterAPI,
    LogoutAPI,
    EditPasswordAPI,
    SeeCurrentUserAPI,
    PersonalExpensesByTypeAPI,
    PersonalExpensesYearsAPI,
    PersonalExpensesByTypeByMonthAPI,
    PersonalExpensesForUserYearsAPI,
    PersonalExpensesPerCountryAPI,
    UserTripsAPI,
    LocationsAPI,
    UsersAPI,
    TagAPI,
    ExpensesForSpecificTrips,
    CreateTripAPI,
    AddUsersToTrip,
    TripAPI,
    ExpenseAPI,
    EditUserInfoAPI,
    UserAvatarUpload,
    DeleteExpenseAPI,
    UpdateExpenseAPI
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin', admin.site.urls),
    path('users/register', RegisterAPI.as_view(), name='register'),
    path('users/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/logout', LogoutAPI.as_view(), name='logout_user'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/edit/personal_info', EditUserInfoAPI.as_view(), name='edit_user_info'),
    path('users/edit/password', EditPasswordAPI.as_view(), name='edit_password'),
    path('users', UsersAPI.as_view(), name="users"),
    path('users/view/current_user', SeeCurrentUserAPI.as_view(), name='see_current_user'),
    path('users/upload_profile_image', UserAvatarUpload.as_view(), name='upload_profile_image'),
    # reports
    path('reports/personal/all_years', PersonalExpensesYearsAPI.as_view(), name='personal_exp_years'),
    path('reports/personal/sum_by_type', PersonalExpensesByTypeAPI.as_view(), name='personal_exp_sum_by_type'),
    path('reports/personal/sum_by_type_by_month', PersonalExpensesByTypeByMonthAPI.as_view(), name='personal_exp_sum_by_type_by_month'),
    path('reports/personal/daily_all_years', PersonalExpensesForUserYearsAPI.as_view(), name='personal_exp_daily_all_years'),
    path('reports/personal/sum_per_country', PersonalExpensesPerCountryAPI.as_view(), name='personal_exp_per_country'),
    # trips
    path('trips/get_all_info/<int:trip_id>', TripAPI.as_view(), name='trip_information'),  # get, put, delete trip
    path('trips', UserTripsAPI.as_view(), name='user_trips'),
    path('trips/add', CreateTripAPI.as_view(), name='handle_trips'),  # post trip
    path('trips/add_user/<int:trip_id>', AddUsersToTrip.as_view(), name='users_to_trip'),  # post, delete
    # locations
    path('locations', LocationsAPI.as_view(), name='locations'),
    # expenses
    path('expenses/specific_trips', ExpensesForSpecificTrips.as_view(), name='expenses_for_specific_trips'), #get
    path('expenses/<int:trip_id>', ExpenseAPI.as_view(), name='add_update_expenses'), # post, delete, patch
    path('expenses/delete/<int:expense_id>', DeleteExpenseAPI.as_view(), name='delete_expense'), # delete, patch
    path('expenses/update/<int:expense_id>', UpdateExpenseAPI.as_view(), name='patch_expense'), # patch
    path('expenses/tags', TagAPI.as_view(), name='expense_tags'), # get all tags
    path('', admin.site.urls),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
