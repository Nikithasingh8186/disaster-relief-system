def parse_incident(data: dict):
    """
    Normalize incident data from frontend / DB
    Ensures consistent structure for GPS + manual + old formats
    """

    location = data.get("location")

    # GPS format (new)
    if isinstance(location, dict) and location.get("type") == "gps":
        value = location.get("value", {})

        location = {
            "type": "gps",
            "value": {
                "lat": value.get("lat"),
                "lng": value.get("lng"),
            },
        }

    # Manual format (new)
    elif isinstance(location, dict) and location.get("type") == "manual":
        location = {
            "type": "manual",
            "value": location.get("value") or "",
        }

    # Old GPS format (flat lat/lng)
    elif isinstance(location, dict):
        if "lat" in location and "lng" in location:
            location = {
                "type": "gps",
                "value": {
                    "lat": location.get("lat"),
                    "lng": location.get("lng"),
                },
            }

    # String format
    elif isinstance(location, str):
        location = {
            "type": "manual",
            "value": location,
        }

    # Invalid / missing
    else:
        location = {
            "type": "unknown",
            "value": "Location not available",
        }

    return {
        **data,
        "location": location,
    }
