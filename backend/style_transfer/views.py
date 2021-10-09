from pathlib import Path
from .apps import StyleTransferConfig

from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import GetImageSerializer
from .fast_style.api import stlye_transfer
from django.core.files.storage import default_storage
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import api_view
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import base64
import os
import cv2
from PIL import Image
import io 

import numpy as np
from django.http import FileResponse
import json
import tempfile


class PostImage(APIView):
    serializer_class = GetImageSerializer
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        img = request.data.get('image')
        path = default_storage.save(
            'tmp/image.jpg', img)
        model = Path(request.data['style'])
        img = cv2.imread(path)
        styled_image = stlye_transfer(
            model=StyleTransferConfig.models[str(model)], content=img)
        img = open(styled_image, 'rb')
        response = FileResponse(img)
        return response


@api_view(['POST'])
def uploadImage(request):
    image = request.FILES.get('image')
    models = Path(request.data['style'])
    models = str(models).split(',')
    styled_images = {}
    
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as temp_file:
        temp_file.write(image.read())
        temp_file.file.seek(0)
        img = cv2.imread(temp_file.name)
        if img is None:
            return Response({'image': image})
        cv2.waitKey()
        img = cv2.resize(img, (400, 300), interpolation=cv2.INTER_AREA)
        for model in models:
            styled_image = stlye_transfer(
                model=StyleTransferConfig.models[str(model)], content=img)

            styled_image = cv2.cvtColor(styled_image, cv2.COLOR_BGR2RGB)
            styled_image = Image.fromarray(styled_image.astype('uint8'))
            file_object = io.BytesIO()
            styled_image.save(file_object, 'PNG')
            file_object.seek(0)
            styled_images[model] = base64.b64encode(file_object.read())
            
        return Response(styled_images)



class GetModels(APIView):

    def get(self, request, format=None):
        """
        Return a list of all models.
        """
        return Response(StyleTransferConfig.model_paths)
