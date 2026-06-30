from backend.app.services.ocr_service import extract_text


def test_extract_text():
    text = extract_text("sample_data/images/sample.jpg")
    assert isinstance(text, str)
