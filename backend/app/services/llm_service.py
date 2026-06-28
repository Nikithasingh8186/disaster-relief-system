from app.services.priority_service import get_priority


def extract_incident(text: str):
    text = text.lower()

    people = 1
    injuries = 0

    if "five" in text:
        people = 5

    if "ten" in text:
        people = 10

    if "injured" in text:
        injuries = 1

    priority = get_priority(
        people,
        injuries
    )

    return {
        "location": "Unknown",
        "people_affected": people,
        "injuries": injuries,
        "needs": text,
        "priority": priority
    }