from backend.app.services.parser_service import parse_incident


def test_parse_incident():
    text = """
    Five people stranded near bus stand.
    Need food and water.
    """

    result = parse_incident(text)

    assert "people_affected" in result
    assert "needs" in result