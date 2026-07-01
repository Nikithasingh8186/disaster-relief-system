from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_get_incidents():
    response = client.get("/incidents")
    assert response.status_code == 200


def test_search_endpoint():
    response = client.get("/search")
    assert response.status_code == 200
