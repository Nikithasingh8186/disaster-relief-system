import re

from backend.app.services.priority_service import get_priority


def extract_incident(text: str):
    original_text = text
    text = text.lower()

    # Default values
    people = 1
    injuries = 0
    location = "Unknown"

    # Extract number of people
    match = re.search(r"(\d+)\s+people", text)
    if match:
        people = int(match.group(1))
    elif "five" in text:
        people = 5
    elif "ten" in text:
        people = 10

    # Detect injuries
    if "injured" in text or "injuries" in text:
        injuries = 1

    # Simple location detection
    if "vijayawada" in text:
        location = "Vijayawada"
    elif "chennai" in text:
        location = "Chennai"
    elif "hyderabad" in text:
        location = "Hyderabad"

    priority = get_priority(people, injuries)

    return {
        "location": location,
        "people_affected": people,
        "injuries": injuries,
        "needs": original_text,
        "priority": priority,
    }