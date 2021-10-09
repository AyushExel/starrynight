import os
from pathlib import Path
from django.apps import AppConfig
from .fast_style import load_model
from typing import Optional, Any


def scan_models(dir):
    models = {}
    for root, sunfolders, files in os.walk(dir):
        for file in files:
            if models.get(Path(root).name):
                if file.endswith(".pth"):
                    models[Path(root).name].append(str(Path(root)/file))
            else:
                if file.endswith(".pth"):
                    models[Path(root).name] = [str(Path(root)/file)]
    return models


class StyleTransferConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'style_transfer'
    model_paths = scan_models('models/')
    models = {}
    for type, paths_list in model_paths.items():
        if type != "experimental":
            for path in paths_list:
                models[path] = load_model(path)
