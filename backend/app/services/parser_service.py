import re

"""Service layer module"""


def parse_incident(data):
    """
    Parses incident text or normalizes incident dictionaries.
    """

    # -----------------------------
    # If input is plain text (used in tests)
    # -----------------------------
    if isinstance(data, str):
        text = data.strip()

        # Extract number of affected people
        pattern = r"(\d+)|one|two|three|four|five|" r"six|seven|eight|nine|ten"

        match = re.search(pattern, text.lower())

        word_to_num = {
            "one": 1,
            "two": 2,
            "three": 3,
            "four": 4,
            "five": 5,
            "six": 6,
            "seven": 7,
            "eight": 8,
            "nine": 9,
            "ten": 10,
        }

        people = 1

        if match:
            value = match.group(0)
            if value.isdigit():
                people = int(value)
            else:
                people = word_to_num.get(value, 1)

        needs = []

        lower = text.lower()

        if "food" in lower:
            needs.append("food")

        if "water" in lower:
            needs.append("water")

        if "medicine" in lower:
            needs.append("medicine")

        if "rescue" in lower:
            needs.append("rescue")

        return {
            "location": "Unknown",
            "people_affected": people,
            "injuries": 0,
            "needs": needs,
            "priority": "High" if people >= 5 else "Low",
        }

    # -----------------------------
    # Existing dictionary support
    # -----------------------------
    location = data.get("location")

    if isinstance(location, dict) and location.get("type") == "gps":
        value = location.get("value", {})
        location = {
            "type": "gps",
            "value": {
                "lat": value.get("lat"),
                "lng": value.get("lng"),
            },
        }

    elif isinstance(location, dict) and location.get("type") == "manual":
        location = {
            "type": "manual",
            "value": location.get("value") or "",
        }

    elif isinstance(location, dict):
        if "lat" in location and "lng" in location:
            location = {
                "type": "gps",
                "value": {
                    "lat": location.get("lat"),
                    "lng": location.get("lng"),
                },
            }

    elif isinstance(location, str):
        location = {
            "type": "manual",
            "value": location,
        }

    else:
        location = {
            "type": "unknown",
            "value": "Location not available",
        }

    data["location"] = location
    return data
