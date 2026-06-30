from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_get_incidents():
    response = client.get("/incidents")
    assert response.status_code == 200


def test_search_endpoint():
    response = client.get("/search")
    assert response.status_code == 200