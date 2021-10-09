from rest_framework import serializers


class GetImageSerializer(serializers.Serializer):
    image = serializers.ImageField()
    style = serializers.CharField()
