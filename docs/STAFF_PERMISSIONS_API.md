# Staff Permissions API Documentation

This documentation outlines the API endpoints for managing staff permissions in the CMX system.

## Base URL
```
http://localhost:8001/staff-permissions
```

## Authentication
All endpoints require authentication. Include the authentication token in the request header:
```
Authorization: Bearer <your-token>
```

## API Endpoints

### 1. Get All Staff Members
Retrieves all staff members for a specific shop.

**Endpoint:** `POST /staff-permissions/getAll`

**Request Body:**
```json
{
    "shopId": "string" // MongoDB ObjectId
}
```

**Success Response:**
```json
{
    "success": true,
    "data": [
        {
            "_id": "string",
            "shopId": "string",
            "email": "string",
            "userName": "string",
            "firstName": "string",
            "lastName": "string",
            "phone": "string",
            "employeeTile": "string",
            "permissions": ["string"],
            "activeStatue": boolean
        }
    ]
}
```

### 2. Add New Staff Member
Creates a new staff member with specified permissions.

**Endpoint:** `POST /staff-permissions/add`

**Request Body:**
```json
{
    "shopId": "string",
    "email": "string",
    "userName": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string",
    "phone": "string",
    "employeeTile": "string",
    "permissions": ["string"]
}
```

**Employee Title Options:**
- "CEO"
- "Owner"
- "NVP"
- "RVP"
- "COO"
- "Director"
- "Controller"
- "Administrative"
- "Accountant"
- "Office"
- "Shop Foreman"
- "Shop Manager"
- "Estimator"
- "Parts"
- "Body Technician"
- "Frame Technician"
- "Painter"
- "Detailer Technician"
- "Paint Prepper"
- "Maintenance Technician"
- "Parts Delivery Driver"
- "Shop Helper"

**Success Response:**
```json
{
    "success": true,
    "message": "Staff member added successfully",
    "data": {
        "_id": "string",
        "shopId": "string",
        "email": "string",
        "userName": "string",
        "firstName": "string",
        "lastName": "string",
        "phone": "string",
        "employeeTile": "string",
        "permissions": ["string"],
        "activeStatue": boolean
    }
}
```

### 3. Update Staff Permissions
Updates permissions for a single staff member.

**Endpoint:** `PUT /staff-permissions/permissions`

**Request Body:**
```json
{
    "staffId": "string",
    "permissions": {
        "Office-X": "none|view|edit|manager|admin",
        "Parts-X": "none|view|edit|manager|admin",
        "Repair Order": "none|view|edit|manager|admin",
        "Tech-X": "none|view|edit|manager|admin",
        "Customer Profile": "none|view|edit|manager|admin",
        "Estimate Profile": "none|view|edit|manager|admin",
        "Vendor-X": "none|view|edit|manager|admin",
        "Accounts Receivable": "none|view|edit|manager|admin",
        "Shop Profile": "none|view|edit|manager|admin"
    }
}
```

**Success Response:**
```json
{
    "success": true,
    "message": "Permissions updated successfully",
    "data": {
        "_id": "string",
        "permissions": {
            // Updated permissions object
        }
    }
}
```

### 4. Batch Update Permissions
Updates permissions for multiple staff members at once.

**Endpoint:** `PUT /staff-permissions/permissions/batch`

**Request Body:**
```json
{
    "staffIds": ["string"],
    "permissions": {
        // Same permissions object structure as single update
    }
}
```

**Success Response:**
```json
{
    "success": true,
    "message": "Batch permissions update successful",
    "data": [
        {
            "_id": "string",
            "permissions": {
                // Updated permissions object
            }
        }
    ]
}
```

### 5. Update Staff Details
Updates general information for a staff member.

**Endpoint:** `PUT /staff-permissions/:staffId`

**URL Parameters:**
- staffId: MongoDB ObjectId of the staff member

**Request Body:**
```json
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "employeeTile": "string",
    // Any other updateable fields
}
```

**Success Response:**
```json
{
    "success": true,
    "message": "Staff member updated successfully",
    "data": {
        // Updated staff member object
    }
}
```

### 6. Delete Staff Member
Removes a staff member from the system.

**Endpoint:** `DELETE /staff-permissions/:staffId`

**URL Parameters:**
- staffId: MongoDB ObjectId of the staff member

**Success Response:**
```json
{
    "success": true,
    "message": "Staff member deleted successfully"
}
```

## Error Responses
All endpoints may return the following error response:

```json
{
    "success": false,
    "message": "Error description",
    "error": "Detailed error message"
}
```

Common error status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Notes for Frontend Implementation

1. Permission Levels:
   - none: No access
   - view: Read-only access
   - edit: Can modify data
   - manager: Full access to module
   - admin: Administrative privileges

2. Always handle both success and error responses appropriately in the UI.

3. Implement proper validation for:
   - Email format
   - Required fields
   - Valid permission levels
   - Valid employee titles

4. Consider implementing optimistic updates for better UX while maintaining data integrity with backend validation.

5. Cache responses where appropriate to minimize API calls.

6. Implement proper error handling and user feedback for all API interactions.
