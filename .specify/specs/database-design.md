# Database Design

## Table: incidents

| Column | Type |
|--------|-------|
| id | INTEGER |
| disaster_type | TEXT |
| reporter_name | TEXT |
| location | TEXT |
| people_affected | INTEGER |
| injuries | INTEGER |
| needs | TEXT |
| priority | TEXT |
| timestamp | DATETIME |

---

## Table: resources

| Column | Type |
|--------|-------|
| id | INTEGER |
| incident_id | INTEGER |
| resource_type | TEXT |
| quantity | INTEGER |