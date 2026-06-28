def get_priority(people, injuries):
    if injuries >= 3:
        return "Critical"

    if people >= 10:
        return "High"

    if people >= 5:
        return "Medium"

    return "Low"