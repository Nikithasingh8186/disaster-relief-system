def parse_incident(data: dict):
    """
    Normalize incident data from frontend / DB
    Ensures consistent structure for GPS + manual + old formats
    """

    location = data.get("location")

    # ----------------------------
    # CASE 1: GPS format (new)
    # ----------------------------
    if isinstance(location, dict) and location.get("type") == "gps":
        location = {
            "type": "gps",
            "value": {
                "lat": location.get("value", {}).get("lat"),
                "lng": location.get("value", {}).get("lng"),
            }
        }

    # ----------------------------
    # CASE 2: Manual location (new)
    # ----------------------------
    elif isinstance(location, dict) and location.get("type") == "manual":
        location = {
            "type": "manual",
            "value": location.get("value") or ""
        }

    # ----------------------------
    # CASE 3: OLD GPS FORMAT
    # ----------------------------
    elif isinstance(location, dict) and "lat" in location and "lng" in location:
        location = {
            "type": "gps",
            "value": {
                "lat": location.get("lat"),
                "lng": location.get("lng"),
            }
        }

    # ----------------------------
    # CASE 4: STRING LOCATION (old data)
    # ----------------------------
    elif isinstance(location, str):
        location = {
            "type": "manual",
            "value": location
        }

    # ----------------------------
    # CASE 5: NULL / INVALID
    # ----------------------------
    else:
        location = {
            "type": "unknown",
            "value": "Location not available"
        }

    # Return cleaned object
    return {
        **data,
        "location": location
    }