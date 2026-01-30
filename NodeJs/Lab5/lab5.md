# Lab 5: Payment Integration & Security Enhancements

## Objective
In this lab, you will add a donations feature to your blog server API with Kashier payment gateway integration. You'll also implement security middleware including sanitization, XSS protection, and rate limiting to protect your API from common attacks.

---

## Requirements

### 1. Install Required Dependencies

Install the necessary packages for payment integration and security:

```bash
npm install axios express-rate-limit express-v5-mongo-sanitize express-xss-sanitizer helmet hpp query-string underscore
```

**Packages explained:**
- `axios`: HTTP client for making API requests to Kashier
- `express-rate-limit`: Rate limiting middleware to prevent abuse
- `express-v5-mongo-sanitize`: Sanitizes user input to prevent NoSQL injection attacks
- `express-xss-sanitizer`: Sanitizes user input to prevent XSS attacks
- `helmet`: Sets various HTTP headers for security
- `hpp`: Protects against HTTP Parameter Pollution attacks
- `query-string`: Utility for parsing and stringifying query strings
- `underscore`: Utility library for JavaScript operations

---

### 2. Update Environment Variables

Add Kashier configuration to your `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017
DB_NAME=iti-zag
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
KASHIER_URL=https://api.kashier.io
KASHIER_API_KEY=your-kashier-api-key
KASHIER_SECRET_KEY=your-kashier-secret-key
KASHIER_MERCHANT_ID=your-kashier-merchant-id
WEBHOOK_URL=https://your-domain.com/donation/webhook
```

**Tasks:**
- Add all Kashier-related environment variables
- **Note:** For local development, you may need to use a tunneling service like ngrok for webhook URLs

---

### 3. Create Donation Model

**Tasks:**
- Create `models/donations.js`
- Define Donation schema with the following fields:
  - `sessionId` (String, required) - Payment session ID from Kashier
  - `orderId` (String, required) - Unique order identifier
  - `amount` (Number, required) - Donation amount
  - `status` (String, enum: ["PENDING", "PAID", "FAILED", "REFUNDED"], default: "PENDING")
  - `sessionURL` (String) - Payment URL from Kashier
  - `webhookData` (Mixed/Schema.Types.Mixed) - Store webhook payload for reference
  - `timestamps` (enabled) - Automatically add `createdAt` and `updatedAt` fields

---

### 4. Create Donation Service

**Tasks:**
- Create `services/donations.js`
- Set up axios HTTP client with Kashier base URL and authentication headers:
  - Base URL from `process.env.KASHIER_URL`
  - Headers: `Content-Type`, `Authorization` (using `KASHIER_SECRET_KEY`), `api-key` (using `KASHIER_API_KEY`)

#### 4.1 `createPaymentSessionFromProvider(amount)`
- Accept donation `amount` as parameter
- Generate unique order ID: `DONATION-${Date.now()}`
- Make POST request to `/v3/payment/sessions` endpoint
- Request body should include:
  - `paymentType`: "credit"
  - `amount`: amount as string
  - `currency`: "EGP"
  - `order`: generated order ID
  - `display`: "en"
  - `allowedMethods`: "card,wallet"
  - `merchantRedirect`: redirect URL (can be placeholder for now)
  - `redirectMethod`: null
  - `failureRedirect`: false
  - `iframeBackgroundColor`: "#FFFFFF"
  - `merchantId`: from environment variable
  - `brandColor`: "#5020FF"
  - `defaultMethod`: "card"
  - `description`: Payment description
  - `manualCapture`: false
  - `saveCard`: "none"
  - `interactionSource`: "ECOMMERCE"
  - `enable3DS`: true
  - `serverWebhook`: webhook URL from environment variable
  - `notes`: optional notes
- Return the response data from Kashier API

#### 4.2 `createDonation(donationData)`
- Accept `donationData` object
- Create donation record in database
- Return created donation

#### 4.3 `handelWebhook(data, signatureHeader)`
- Accept webhook `data` and `signatureHeader` from request
- Sort `data.signatureKeys` array
- Extract signature payload using `underscore.pick()` with `signatureKeys`
- Convert payload to query string using `query-string.stringify()`
- Generate HMAC SHA256 signature:
  - Use `crypto.createHmac('sha256', KASHIER_API_KEY)`
  - Update with signature payload
  - Get hex digest
- Compare generated signature with `signatureHeader`
- Return `true` if signatures match, `false` otherwise

#### 4.4 `updateDonationStatus(body)`
- Accept webhook `body` containing `data` and `event`
- Find donation by `orderId` using `data.merchantOrderId`
- Throw `APIError` with status 404 if donation not found
- Update donation status:
  - If `data.status === "SUCCESS"`: set status to "PAID"
  - Otherwise: set status to "FAILED"
- Store full webhook payload in `webhookData` field
- Update donation record in database

---

### 5. Create Donation Controller

**Tasks:**
- Create `controllers/donations.js`

#### 5.1 `createDonation(req, res)`
- Extract `amount` from request body
- Call `createPaymentSessionFromProvider(amount)` to create payment session
- Handle errors: throw `APIError` with status 503 if payment gateway is unavailable
- Create donation record with:
  - `sessionId`: from `session._id`
  - `orderId`: from `session.paymentParams.order`
  - `amount`: from `session.paymentParams.amount`
  - `sessionURL`: from `session.sessionUrl`
- Return response with status 200 containing `sessionURL` for client to redirect

#### 5.2 `webhook(req, res)`
- Extract webhook data from request body (`data`, `event`)
- Extract signature from request header: `x-kashier-signature`
- Verify webhook signature using `handelWebhook()`
- Throw `APIError` with status 400 if signature is invalid
- Call `updateDonationStatus()` to update donation status
- Return success response with status 200

---

### 6. Create Donation Routes

**Tasks:**
- Create `routers/donation.js` (or `donations.js`)
- Implement routes:
  - `POST /donation` - Create donation and payment session (with validation)
  - `POST /donation/webhook` - Handle webhook from Kashier (no validation needed, webhook handles its own verification)
- Register router in `index.js` as `/donation`

**Important:** Webhook route should NOT require authentication (it's called by Kashier's servers)

---

### 7. Create Donation Validation Schema

**Tasks:**
- Create `schemas/donation/` folder
- Create `donateSchema.js`:
  - Validate `req.body`:
    - `amount`: number, minimum 5, required
- Create `index.js` to export the schema
- Update main `schemas/index.js` to include donations schemas

---

### 8. Implement Rate Limiting Middleware

**Tasks:**
- Create `middlewares/rateLimiter.js`
- Use `express-rate-limit` to create rate limiter:
  - `windowMs`: 15 minutes (15 * 60 * 1000)
  - `limit`: 100 requests per window per IP
  - `standardHeaders`: 'draft-8' (for RateLimit headers)
  - `legacyHeaders`: false (disable X-RateLimit-* headers)
  - `ipv6Subnet`: 56 (for IPv6 support)
  - Custom `handler`: throw `APIError` with status 429 and message "Too many requests, please try again later."
- Export the rate limiter middleware

---

### 9. Apply Security Middleware

**Tasks:**
- Update `index.js` to add security middleware in the correct order:

#### 9.1 Trust Proxy
- Add `app.set('trust proxy', 1)` before other middleware (needed for rate limiting behind proxies)

#### 9.2 Helmet
- Use `helmet()` middleware to set security HTTP headers

#### 9.3 MongoDB Sanitization
- Use `sanitizeMongoInput` from `express-v5-mongo-sanitize` to prevent NoSQL injection

#### 9.4 XSS Protection
- Use `xss()` from `express-xss-sanitizer` to sanitize user input

#### 9.5 HTTP Parameter Pollution Protection
- Use `hpp()` middleware to prevent HTTP Parameter Pollution attacks

#### 9.6 Rate Limiting
- Apply rate limiter middleware globally (or to specific routes as needed)

**Middleware Order:**
1. Trust proxy
2. CORS
3. Express JSON parser
4. Helmet
5. MongoDB sanitization
6. XSS sanitization
7. HPP protection
8. Rate limiter
9. Routes
10. Error handler (last)

---

## Testing Your Implementation

### Test Cases:

#### Donation Endpoints:

1. **Create Donation:**
   ```json
   POST http://localhost:3000/donation
   {
     "amount": 100
   }
   ```
   Should return: `200 OK` with `sessionURL` for payment

2. **Create Donation with Invalid Amount:**
   ```json
   POST http://localhost:3000/donation
   {
     "amount": 2
   }
   ```
   Should return: `400 Bad Request` with validation error (minimum is 5)

3. **Test Rate Limiting:**
   - Make 101 requests rapidly to any endpoint
   - Should return: `429 Too Many Requests` after 100 requests

4. **Test Webhook (Manual):**
   ```json
   POST http://localhost:3000/donation/webhook
   Headers: x-kashier-signature: <signature>
   {
     "data": {
       "merchantOrderId": "<orderId>",
       "status": "SUCCESS",
       ...
     },
     "event": "payment.success",
     "signatureKeys": [...]
   }
   ```
   - Should verify signature and update donation status
   - Should return: `200 OK` if valid, `400 Bad Request` if invalid signature

### Security Testing:

1. **NoSQL Injection Test:**
   ```json
   POST http://localhost:3000/users/sign-in
   {
     "email": {"$ne": null},
     "password": {"$ne": null}
   }
   ```
   Should be sanitized and fail validation (not execute MongoDB query)

2. **XSS Test:**
   ```json
   POST http://localhost:3000/posts
   {
     "title": "<script>alert('XSS')</script>",
     "content": "Test"
   }
   ```
   Should sanitize script tags

3. **Rate Limit Test:**
   - Make rapid requests to any endpoint
   - Should be rate limited after threshold

---

## Submission Checklist

- [ ] All dependencies installed (axios, express-rate-limit, sanitization packages, helmet, hpp, query-string, underscore)
- [ ] Kashier environment variables added to `.env`
- [ ] Donation model created with all required fields
- [ ] Donation service implemented:
  - [ ] HTTP client configured with Kashier credentials
  - [ ] `createPaymentSessionFromProvider` function implemented
  - [ ] `createDonation` function implemented
  - [ ] `handelWebhook` function implemented with signature verification
  - [ ] `updateDonationStatus` function implemented
- [ ] Donation controller implemented:
  - [ ] `createDonation` controller with error handling
  - [ ] `webhook` controller with signature verification
- [ ] Donation routes created and registered
- [ ] Donation validation schema created
- [ ] Rate limiting middleware created and configured
- [ ] Security middleware applied in `index.js`:
  - [ ] Trust proxy configured
  - [ ] Helmet middleware added
  - [ ] MongoDB sanitization added
  - [ ] XSS sanitization added
  - [ ] HPP protection added
  - [ ] Rate limiter applied
- [ ] All endpoints tested:
  - [ ] Create donation working
  - [ ] Webhook handling working (signature verification)
  - [ ] Rate limiting working
  - [ ] Security middleware working (sanitization, XSS protection)

---

## Tips

- **Webhook Testing:** Use ngrok or similar tunneling service for local webhook testing:
  ```bash
  ngrok http 3000
  ```
  Then use the ngrok URL in your `WEBHOOK_URL` environment variable

- **Signature Verification:** Always verify webhook signatures to ensure requests are from Kashier

- **Error Handling:** Handle payment gateway errors gracefully (503 Service Unavailable)

- **Security:** Apply security middleware in the correct order for maximum protection

- **Rate Limiting:** Adjust rate limit values based on your application needs (100 requests per 15 minutes is a good starting point)

- **Environment Variables:** Never commit `.env` file with real API keys to version control

---

## Common Issues & Solutions

1. **Webhook signature verification failing:**
   - Check that `signatureKeys` are sorted correctly
   - Verify you're using the correct API key for signature generation
   - Ensure query string formatting matches Kashier's expectations

2. **Rate limiting not working:**
   - Ensure `trust proxy` is set if behind a proxy/load balancer
   - Check that rate limiter middleware is applied before routes

3. **Payment session creation failing:**
   - Verify all Kashier environment variables are set correctly
   - Check that merchant ID, API key, and secret key are valid
   - Ensure webhook URL is accessible (use ngrok for local testing)

4. **Sanitization breaking valid data:**
   - Review sanitization middleware order
   - Some sanitization may be too aggressive - adjust if needed

---

Good luck! 🚀
