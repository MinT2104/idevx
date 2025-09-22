# Models API Documentation

API CRUD cho quản lý models với đầy đủ các tính năng.

## Base URL

```
/api/models
```

## Endpoints

### 1. Lấy danh sách models (GET /api/models)

**Query Parameters:**

- `page` (optional): Số trang (default: 1)
- `limit` (optional): Số items per page (default: 10)
- `search` (optional): Tìm kiếm theo tên, brand, description
- `brand` (optional): Lọc theo brand
- `type` (optional): Lọc theo type

**Example:**

```bash
GET /api/models?page=1&limit=10&search=gpt&brand=OpenAI
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "GPT-5",
      "brand": "OpenAI",
      "logo": "https://example.com/openai-logo.png",
      "type": "LLM",
      "link": "/models/gpt-5",
      "description": "OpenAI's most advanced text generation model",
      "hero": { ... },
      "pageInfo": { ... },
      "detailedInfo": { ... },
      "whyModelMattersData": { ... },
      "sidebarData": { ... },
      "modelListData": [ ... ],
      "modelSections": [ ... ],
      "createdAt": "2025-01-20T10:00:00.000Z",
      "updatedAt": "2025-01-20T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "total": 25,
    "totalPages": 3,
    "limit": 10
  }
}
```

### 2. Tạo model mới (POST /api/models)

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "model": {
    "name": "GPT-5",
    "brand": "OpenAI",
    "logo": "https://example.com/openai-logo.png",
    "type": "LLM",
    "link": "/models/gpt-5",
    "description": "OpenAI's most advanced text generation model"
  },
  "hero": {
    "title": "Text Generation Models",
    "description": "Please read these terms and conditions carefully before using Our Service.",
    "ctaButton": "Get Started",
    "ctaButton2": "Talk to an Expert",
    "subtitle": "Open AI",
    "link1": "https://www.google.com",
    "link2": "https://www.google.com"
  },
  "pageInfo": {
    "lastUpdated": "Aug 2025",
    "title": "GPT-5 — OpenAI's Text Generation",
    "description": "GPT-5 represents OpenAI's most advanced evolution yet..."
  },
  "detailedInfo": {
    "title": "GPT-5 | Model library",
    "description": "OpenAI's most advanced evolution yet...",
    "capabilities": ["reasoning", "coding", "creative writing"],
    "pricing": [
      {
        "variant": "GPT-5 (Standard)",
        "bestFor": "Full reasoning, coding, multimodal tasks",
        "input": "$1.25 (cached: $0.125)",
        "output": "$10.00",
        "provider": "OpenAI"
      }
    ],
    "tags": ["LLM", "Text Generation", "OpenAI"],
    "modelDetails": {
      "developedBy": "OpenAI",
      "modelFamily": "GPT",
      "useCase": "large language",
      "variant": "5",
      "size": "Unknown",
      "license": "OpenAI License Agreement"
    },
    "codeExample": [
      "from openai import OpenAI\n\nclient = OpenAI(api_key=\"YOUR_API_KEY\")\n..."
    ],
    "hardware": ["H100", "A100", "V100"],
    "benchmarks": ["MMLU", "HumanEval", "GSM8K"],
    "useCases": ["assistant", "creative writing", "coding"],
    "limitations": ["May generate inaccurate information"]
  },
  "whyModelMattersData": {
    "title": "Why GPT-5 Matters",
    "points": [
      {
        "id": "versatility",
        "title": "Unmatched Versatility:",
        "description": "Ideal for developers, analysts, and enterprise users..."
      }
    ],
    "ctaButton": {
      "text": "Read Official Documentation",
      "link": "https://openai.com/docs"
    }
  },
  "sidebarData": {
    "title": "Model Details",
    "details": [
      {
        "id": "developed-by",
        "label": "Developed by",
        "value": "OpenAI"
      }
    ],
    "button": {
      "text": "View Repository",
      "link": "https://github.com"
    }
  },
  "modelListData": [
    {
      "id": "gpt-5",
      "name": "GPT-5",
      "isActive": true
    }
  ],
  "modelSections": [
    {
      "title": "large language models",
      "models": [
        {
          "logo": "K",
          "name": "Kimi K2 0905",
          "description": "0905-K2",
          "tags": ["LLM"]
        }
      ],
      "showSeeAll": true
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "GPT-5",
    "brand": "OpenAI",
    ...
  }
}
```

### 3. Lấy model theo ID (GET /api/models/:id)

**Example:**

```bash
GET /api/models/64f8a1b2c3d4e5f6a7b8c9d0
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "GPT-5",
    ...
  }
}
```

### 4. Lấy model theo link (GET /api/models/link/:link)

**Example:**

```bash
GET /api/models/link/models/gpt-5
```

### 5. Cập nhật model (PATCH /api/models/:id)

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (Tất cả fields optional)

```json
{
  "model": {
    "name": "GPT-5 Updated",
    "description": "Updated description"
  },
  "pageInfo": {
    "lastUpdated": "Sep 2025"
  }
}
```

### 6. Xóa model (DELETE /api/models/:id)

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Model deleted successfully"
}
```

### 7. Lấy danh sách brands (GET /api/models/brands)

**Response:**

```json
{
  "success": true,
  "data": ["OpenAI", "Kimi", "DeepSeek", "Qwen"]
}
```

### 8. Lấy danh sách types (GET /api/models/types)

**Response:**

```json
{
  "success": true,
  "data": ["LLM", "Image Generation", "Embedding", "Code Generation"]
}
```

### 9. Kiểm tra model tồn tại (GET /api/models/:id/exists)

**Response:**

```json
{
  "success": true,
  "data": {
    "exists": true
  }
}
```

### 10. Duplicate model (POST /api/models/:id/duplicate)

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "GPT-5 (Copy)",
    ...
  }
}
```

## Seed Data

### Seed multiple models (POST /api/seed/models)

**Response:**

```json
{
  "success": true,
  "message": "Models seeded successfully",
  "data": [
    { "id": "64f8a1b2c3d4e5f6a7b8c9d0", "name": "GPT-5" },
    { "id": "64f8a1b2c3d4e5f6a7b8c9d1", "name": "Kimi K2 0905" }
  ]
}
```

### Seed single model from JSON (POST /api/seed/single)

**Response:**

```json
{
  "success": true,
  "message": "Model seeded successfully",
  "data": { "id": "64f8a1b2c3d4e5f6a7b8c9d0", "name": "GPT-5" }
}
```

## Error Responses

```json
{
  "error": "Error message"
}
```

**Status Codes:**

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `409`: Conflict (duplicate link)
- `500`: Internal Server Error

## Database Migration

Để sử dụng API này, bạn cần chạy migration để tạo table `Model`:

```bash
npx prisma db push
```

Hoặc nếu sử dụng migration:

```bash
npx prisma migrate dev --name add-model-table
```
