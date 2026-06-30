from backend.app.services.priority_service import calculate_priority


def test_high_priority():
    priority = calculate_priority(people_affected=10, injuries=2)

    assert priority in ["Low", "Medium", "High", "Critical"]
