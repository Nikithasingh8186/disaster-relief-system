# API Documentation

## POST /upload/audio

Uploads audio and creates an incident.

### Request

multipart/form-data

### Response

```json
{
  "success": true,
  "incident_id": 1
}
```

---

## POST /upload/image

Uploads image and creates incident.

---

## POST /upload/text

Uploads text and creates incident.

---

## GET /incidents

Returns all incidents.

---

## GET /incident/{id}

Returns a specific incident.

---

## GET /search

Search incidents.

Parameters:

* location
* priority
* disaster_type

---

## GET /export

Exports incidents as CSV.
