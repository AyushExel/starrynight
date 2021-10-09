from .stylize import load_model, stylize
from .utils import itot, load_image, show
import cv2
import os
from pathlib import Path
DEFAULT_MODEL = 'models/tokyo_ghoul_light.pth'
DEFAULT_CONTENT = 'images/up-diliman.jpg'
DEFAULT_OUTPUT = 'up-diliman-stlyed.jpg'


def stlye_transfer(model=None, content=None, output=None):
    model = model if model else DEFAULT_MODEL
    #content = content if content else DEFAULT_CONTENT
    output = output if output else DEFAULT_OUTPUT

    #content_image = load_image(content)
    content_tensor = itot(content)
    #net = load_model(model)
    generated_image = stylize(
        model, content_image=None, output_path=output, content_tensor=content_tensor)
    if not os.path.isdir('generations'):
        os.mkdir('generations')
    img = generated_image.clip(0, 255)
    
    #cv2.imwrite(str(Path('generations')/output), img)
    #return Path('generations')/output
    return img
