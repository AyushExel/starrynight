import torch
from torch.cuda import random
from style_transfer.fast_style import utils, transformer
import os
from torchvision import transforms
import time
import random

STYLE_TRANSFORM_PATH = "transforms/udnie_aggressive.pth"
PRESERVE_COLOR = False


def load_model(model_path=None):
    # Device
    device = ("cuda" if torch.cuda.is_available() else "cpu")
    model_path = model_path if model_path else STYLE_TRANSFORM_PATH
    # Load Transformer Network
    net = transformer.TransformerNetwork()
    net.load_state_dict(torch.load(model_path, map_location=device))
    net = net.to(device)

    return net


def stylize(model=None, content_image=None, output_path='output/result.jpg', content_tensor=None):
    # Device
    device = ("cuda" if torch.cuda.is_available() else "cpu")

    if model:
        net = model
    else:
        # Load Transformer Network
        net = transformer.TransformerNetwork()
        net.load_state_dict(torch.load(STYLE_TRANSFORM_PATH,
                            map_location=device))
        net = net.to(device)

    with torch.no_grad():
        torch.cuda.empty_cache()
        if content_tensor is None:
            if not content_image:
                raise Exception(
                    "Both path and content tensor cannot be empty")
            content_image = utils.load_image(content_image)
            content_tensor = utils.itot(content_image).to(device)

        starttime = time.time()
        content_tensor = content_tensor.to(device)
        generated_tensor = net(content_tensor)
        generated_image = utils.ttoi(generated_tensor.detach())
        if (PRESERVE_COLOR):
            generated_image = utils.transfer_color(
                content_image, generated_image)
        print("Transfer Time: {}".format(time.time() - starttime))
        #utils.saveimg(generated_image, str(random.randint(1,100000))+output_path)
        # utils.show(generated_image)
    return generated_image
