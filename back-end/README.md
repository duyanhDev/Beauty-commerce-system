# Cosmetics Shop — NestJS RBAC Setup

---

## Cấu trúc thư mục

```
src/
├── main.ts                          # Swagger + ValidationPipe + Prefix
├── app.module.ts                    # TypeORM + Guards global + Middleware
│
├── common/
│   ├── decorators/
│   │   └── index.ts                 # @Public() | @Roles() | @Permissions()
│   ├── guards/
│   │   ├── jwt-auth.guard.ts        # Verify JWT token
│   │   └── roles.guard.ts           # Check role + permission
│   └── middleware/
│       └── logger.middleware.ts     # Log mọi request
│
├── entities/                        # 23 TypeORM entities
│   └── index.ts                     # Barrel export
│
└── modules/
    ├── auth/                        # Login / Register
    │   ├── strategies/jwt.strategy.ts
    │   ├── dto/auth.dto.ts
    │   ├── auth.service.ts
    │   ├── auth.controller.ts
    │   └── auth.module.ts
    ├── users/
    ├── roles/
    ├── permissions/
    ├── categories/
    ├── products/
    ├── product-variants/
    ├── product-attributes/
    ├── cart/
    ├── orders/
    ├── payments/
    ├── reviews/
    ├── wishlist/
    ├── inventory/
    └── shipping-addresses/
```

---

## Luồng hoạt động

```
Request
  ↓
LoggerMiddleware        → ghi log method / url / status / duration
  ↓
JwtAuthGuard            → verify Bearer token
  │  @Public() ?        → bỏ qua, cho đi thẳng
  ↓
JwtStrategy.validate    → load user + role + permissions → gán req.user
  ↓
RolesGuard
  ├── @Roles('admin')       → check user.role.name
  ├── @Permissions('x')     → admin? bypass ✅
  │                         → check user.role.permissions
  └── không decorator       → cho qua (đã login là đủ)
  ↓
Controller / Handler
```

---

## Bảng phân quyền

| API                      | admin | staff (có permission) | customer |
| ------------------------ | ----- | --------------------- | -------- |
| GET /products            | ✅    | ✅                    | ✅       |
| POST /products           | ✅    | ✅ create_product     | ❌       |
| PATCH /products/:id      | ✅    | ✅ update_product     | ❌       |
| DELETE /products/:id     | ✅    | ❌                    | ❌       |
| GET /orders              | ✅    | ✅ manage_orders      | ❌       |
| GET /orders/my-orders    | ✅    | ✅                    | ✅       |
| PATCH /orders/:id/status | ✅    | ✅ manage_orders      | ❌       |
| GET /users               | ✅    | ✅ manage_users       | ❌       |
| POST /users              | ✅    | ❌                    | ❌       |
| DELETE /users/:id        | ✅    | ❌                    | ❌       |
| GET /users/me            | ✅    | ✅                    | ✅       |

---

## Cách dùng Decorator trong Controller

```typescript
// Ai cũng vào được (không cần token)
@Public()
@Get()
findAll() {}

// Chỉ admin
@Roles('admin')
@Delete(':id')
remove() {}

// admin bypass, staff cần permission cụ thể
@Permissions('create_product')
@Post()
create() {}

// Kết hợp: đúng role VÀ có permission
@Roles('staff')
@Permissions('manage_orders')
@Patch(':id/status')
updateStatus() {}
```

---

## Swagger

Sau khi chạy app, truy cập: `http://localhost:3000/api/docs`

- Click **Authorize** → nhập Bearer token từ `/api/v1/auth/login`
- Token được giữ sau khi reload nhờ `persistAuthorization: true`
