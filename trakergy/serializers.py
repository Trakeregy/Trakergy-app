from django.core.exceptions import ObjectDoesNotExist

from .models import *
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


# maps python objects to json


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    username = serializers.Field(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    password1 = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'last_name',
                  'password1', 'password2']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        try:
            user = CustomUser.objects.create(
                username=validated_data['username'],
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )

            user.set_password(validated_data['password1'])
            user.save()
            return user
        except Exception as e:
            print(e)


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'image_url')


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'code', 'country')


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ('id', 'name', 'image_url', 'from_date', 'to_date', 'location', 'description', 'admin', 'members')


class TripUpsertSerializer(serializers.ModelSerializer):
    members = serializers.ListField(required=False)

    class Meta:
        model = Trip
        fields = ('name', 'image_url', 'from_date', 'to_date', 'location', 'description', 'members')

    def validate(self, data):
        """
        Checks that start date is before end date.
        Checks that members exist.
        """
        if 'from_date' in data and 'to_date' in data and data['from_date'] > data['to_date']:
            raise serializers.ValidationError("End date must occur after start.")
        if 'members' in data:
            for member_id in data['members']:
                try:
                    CustomUser.objects.get(id=member_id)
                except ObjectDoesNotExist:
                    raise serializers.ValidationError(f"Wrong member id: {member_id}")
        return data


class TripDetailSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField(method_name='get_location')
    admin = serializers.SerializerMethodField(method_name='get_admin')
    members_count = serializers.SerializerMethodField(method_name='get_members_count')
    members = serializers.SerializerMethodField(method_name='get_members')

    def get_location(selfself, obj):
        serializer = LocationSerializer(Location.objects.get(id=obj.location.id))
        return serializer.data

    def get_admin(self, obj):
        if obj.admin:
            serializer = CustomUserSerializer(CustomUser.objects.get(id=obj.admin.id))
            return serializer.data
        return None

    def get_members(self, obj):
        data = []
        for member in obj.members.all():
            serializer = CustomUserSerializer(CustomUser.objects.get(id=member.id))
            data.append(serializer.data)
        return data

    def get_members_count(self, obj):
        return obj.members.count()

    class Meta:
        model = Trip
        fields = ['id', 'name', 'image_url', 'description', 'location', 'from_date', 'to_date', 'admin', 'members', 'members_count']


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'amount', 'description', 'date', 'tag', 'payer', 'users_to_split')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class SumByTypeSerializer(serializers.Serializer):
    tag_name = serializers.CharField()
    sum = serializers.FloatField()
