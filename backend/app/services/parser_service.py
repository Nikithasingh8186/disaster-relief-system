"""
Parser service for incident data extraction.
"""


def parse_incident(text):
    """Parse incident details from text."""
    if not text:
        return {}

    result = {
        "location": "unknown",
        "people_affected": 0,
        "injuries": 0,
        "needs": "unknown",
        "priority": "low",
    }

    if "fire" in text:
        result["priority"] = "high"
    elif "flood" in text:
        result["priority"] = "medium"
    else:
        result["priority"] = "low"

    return result
