# API Specification

## POST /upload/audio

Description:
Upload audio and generate incident report.

Request:
multipart/form-data

Response:

{
  "success": true,
  "incident_id": 1
}

---

## POST /upload/image

Description:
Upload image.

---

## POST /upload/text

Description:
Upload text report.

---

## GET /incidents

Description:
Fetch all incidents.

---

## GET /incident/{id}

Description:
Fetch single incident.

---

## GET /search

Description:
Search incidents.

---

## GET /export

Description:
Export reports.