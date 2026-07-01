import pytesseract
from PIL import Image


def extract_text(image_path: str) -> str:
    """
    Extract text from an image using OCR.
    Returns an empty string if the image cannot be processed.
    """
    try:
        image = Image.open(image_path)
        return pytesseract.image_to_string(image)
    except Exception:
        return ""
