from pydantic import BaseModel


class Resource(BaseModel):
    incident_id: int
    resource_type: str
    quantity: int