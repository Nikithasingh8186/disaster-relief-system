def calculate_priority(people_affected: int, injuries: int) -> str:
    """Calculate the priority level of an incident."""

    score = people_affected + injuries * 5

    if score >= 20:
        return "Critical"
    if score >= 10:
        return "High"
    if score >= 5:
        return "Medium"
    return "Low"
