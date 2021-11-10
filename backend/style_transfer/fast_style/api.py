from .stylize import load_model, stylize
from .utils import itot, load_image, show
import cv2
import os
DEFAULT_OUTPUT = 'up-diliman-stlyed.jpg'


def stlye_transfer(model, content, output=None):
    output = output if output else DEFAULT_OUTPUT
    content_tensor = itot(content)
    generated_image = stylize(
        model, content_image=None, output_path=output, content_tensor=content_tensor)
    img = generated_image.clip(0, 255)
    
    return img
