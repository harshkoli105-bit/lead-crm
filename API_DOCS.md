# API Documentation — LeadCRM

Base URL: `http://localhost:5000`

All responses follow this envelope:
```json
{ "success": true|false, "data": ..., "message": "..." }
```

---

## Endpoints

### GET /leads

Fetch all leads. Supports optional query parameters for search and filter.

**Query Parameters**

| Param    | Type   | Description                         |
|----------|--------|-------------------------------------|
| search   | string | Filter by name or phone (partial)   |
| status   | string | Filter by exact status              |

**Example Request**
```
GET /leads?search=ravi&status=Interested
```

**Example Response**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Ravi Kumar",
      "phone": "9876543210",
      "source": "Call",
      "status": "Interested",
      "created_at": "2025-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

---

### GET /leads/stats

Get dashboard statistics — total leads grouped by status.

**Example Request**
```
GET /leads/stats
```

**Example Response**
```json
{
  "success": true,
  "data": {
    "total": "10",
    "interested": "5",
    "not_interested": "2",
    "converted": "3"
  }
}
```

---

### POST /leads

Create a new lead.

**Request Body**
```json
{
  "name": "Arjun Singh",
  "phone": "9988776655",
  "source": "WhatsApp"
}
```

**Validation Rules**
- `name` — required, non-empty string
- `phone` — required, exactly 10 digits
- `source` — required, one of: `Call`, `WhatsApp`, `Field`

**Success Response (201)**
```json
{
  "success": true,
  "data": {
    "id": 11,
    "name": "Arjun Singh",
    "phone": "9988776655",
    "source": "WhatsApp",
    "status": "Interested",
    "created_at": "2025-01-15T11:00:00.000Z"
  },
  "message": "Lead created successfully"
}
```

**Error Response (400)**
```json
{
  "success": false,
  "message": "Phone must be exactly 10 digits"
}
```

---

### PUT /leads/:id

Update the status of a lead.

**URL Parameter**
- `id` — integer, lead ID

**Request Body**
```json
{
  "status": "Converted"
}
```

**Allowed Status Values**
- `Interested`
- `Not Interested`
- `Converted`

**Success Response (200)**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Ravi Kumar",
    "phone": "9876543210",
    "source": "Call",
    "status": "Converted",
    "created_at": "2025-01-15T10:30:00.000Z"
  },
  "message": "Status updated successfully"
}
```

**Error Response (404)**
```json
{
  "success": false,
  "message": "Lead not found"
}
```

---

### DELETE /leads/:id

Delete a lead permanently.

**URL Parameter**
- `id` — integer, lead ID

**Success Response (200)**
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

**Error Response (404)**
```json
{
  "success": false,
  "message": "Lead not found"
}
```

---

## HTTP Status Codes Used

| Code | Meaning                          |
|------|----------------------------------|
| 200  | OK — request succeeded           |
| 201  | Created — resource created       |
| 400  | Bad Request — validation error   |
| 404  | Not Found — resource missing     |
| 500  | Internal Server Error            |

---

## Testing with curl

```bash
# Add a lead
curl -X POST http://localhost:5000/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"9876543210","source":"Call"}'

# Get all leads
curl http://localhost:5000/leads

# Search leads
curl "http://localhost:5000/leads?search=test"

# Filter by status
curl "http://localhost:5000/leads?status=Interested"

# Update status
curl -X PUT http://localhost:5000/leads/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Converted"}'

# Delete a lead
curl -X DELETE http://localhost:5000/leads/1

# Get dashboard stats
curl http://localhost:5000/leads/stats
```
