class Incident:
    """Represents an incident record in the system"""

    def __init__(self, location, people_affected, injuries, needs, priority):
        self.location = location
        self.people_affected = people_affected
        self.injuries = injuries
        self.needs = needs
        self.priority = priority
