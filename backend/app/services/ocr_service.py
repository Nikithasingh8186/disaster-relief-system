"""OCR Service module"""


def extract_text(image):
    """
    Extract text from image (mock implementation).
    """
    _ = image

    try:
        return "sample extracted text"
    except BaseException:
        return ""
