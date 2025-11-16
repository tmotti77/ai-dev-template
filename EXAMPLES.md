# AI Dev Team - Example Workflows

This document shows practical examples of how to use the AI development team.

## Example 1: Building a REST API Endpoint

### Step 1: Design & Implementation (Claude)

**You**: "I need a REST API endpoint for user registration with email and password"

**Claude (Lead Dev)**:
```javascript
// api/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { validateEmail, validatePassword } = require('../utils/validation');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters with uppercase, lowercase, and numbers'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user (assuming db module exists)
    const user = await db.users.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

### Step 2: Write Tests (Codex)

**You**: "@codex Write tests for this registration endpoint"

**Codex (Test Engineer)**:
```javascript
// api/routes/auth.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('POST /api/auth/register', () => {

  beforeEach(async () => {
    await db.users.deleteAll(); // Clean test database
  });

  test('should register user with valid email and password', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.userId).toBeDefined();
  });

  test('should reject invalid email format', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'invalid-email',
        password: 'SecurePass123'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
  });

  test('should reject weak password', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'weak'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Password must be');
  });

  test('should hash password before storing', async () => {
    const password = 'SecurePass123';
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password
      });

    const user = await db.users.findByEmail('test@example.com');
    expect(user.password).not.toBe(password);
    expect(user.password).toMatch(/^\$2[aby]\$/); // bcrypt hash format
  });

  test('should handle duplicate email registration', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'SecurePass123'
    };

    await request(app).post('/api/auth/register').send(userData);
    const response = await request(app).post('/api/auth/register').send(userData);

    expect(response.status).toBe(400);
  });
});
```

### Step 3: Run Tests (Copilot)

**You**: "@copilot Run the test suite"

**Copilot (CLI Runner)**:
```bash
$ npm test -- auth.test.js

 PASS  api/routes/auth.test.js
  POST /api/auth/register
    ✓ should register user with valid email and password (245ms)
    ✓ should reject invalid email format (89ms)
    ✓ should reject weak password (76ms)
    ✓ should hash password before storing (198ms)
    ✓ should handle duplicate email registration (156ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Time:        2.145 s
```

### Step 4: Code Review (Grok)

**You**: "@grok Review this registration endpoint"

**Grok (Code Reviewer)**:

**Review Summary**
- Files reviewed: auth.js, auth.test.js
- Critical issues: 2
- Suggestions: 3

**Critical Issues**

1. **Missing duplicate email check** (auth.js:25)
   - Problem: No validation for existing email before creating user
   - Impact: Database error or account override
   - Fix: Add check before user creation
   ```javascript
   const existingUser = await db.users.findByEmail(email);
   if (existingUser) {
     return res.status(400).json({ error: 'Email already registered' });
   }
   ```

2. **Password exposed in error logs** (auth.js:39)
   - Problem: `console.error` may log request body with password
   - Impact: Security - passwords in logs
   - Fix: Log only error message, not full error object

**Suggestions**

1. Add rate limiting to prevent brute force attacks
2. Consider email verification before activation
3. Add input sanitization to prevent injection attacks

### Step 5: Refactor (Gemini)

**You**: "@gemini Refactor based on Grok's review"

**Gemini (Refactoring Specialist)**:

```javascript
// api/routes/auth.js (refactored)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const { validateEmail, validatePassword, sanitizeInput } = require('../utils/validation');

// Rate limiting: 5 registration attempts per 15 minutes
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many registration attempts, please try again later'
});

router.post('/register', registerLimiter, async (req, res) => {
  try {
    // Sanitize inputs
    const email = sanitizeInput(req.body.email?.toLowerCase());
    const password = req.body.password;

    // Validate input
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters with uppercase, lowercase, and numbers'
      });
    }

    // Check for existing user
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db.users.create({
      email,
      password: hashedPassword,
      verified: false // Require email verification
    });

    // TODO: Send verification email

    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify.',
      userId: user.id
    });

  } catch (error) {
    // Log error without sensitive data
    console.error('Registration error:', {
      message: error.message,
      code: error.code
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

**Refactoring Summary**
- Added rate limiting (5 attempts/15min)
- Added duplicate email check
- Sanitized inputs to prevent injection
- Normalized email to lowercase
- Removed password from error logs
- Added email verification flag

---

## Example 2: Bug Fix Workflow

### Reported Bug
"Users can submit empty form data, causing database errors"

### Step 1: Analysis (Grok)

**Grok**:
- Bug location: `forms/contactForm.js:45`
- Impact: HIGH - Database crashes, poor UX
- Root cause: Missing client and server-side validation
- Affected: Contact form, newsletter signup

### Step 2: Implementation (Claude)

**Claude**:
```javascript
// Before
async function submitContact(formData) {
  await db.contacts.create(formData);
}

// After
async function submitContact(formData) {
  const { name, email, message } = formData;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    throw new ValidationError('All fields are required');
  }

  if (!isValidEmail(email)) {
    throw new ValidationError('Invalid email format');
  }

  await db.contacts.create({ name, email, message });
}
```

### Step 3: Regression Test (Codex)

**Codex**:
```javascript
test('should reject empty form submission', async () => {
  await expect(submitContact({ name: '', email: '', message: '' }))
    .rejects.toThrow('All fields are required');
});
```

### Step 4: Verify (Copilot)

**Copilot**:
```bash
$ npm test

✓ All tests passed
✓ No database errors
✓ Bug fixed and verified
```

---

## Example 3: Code Quality Sprint

### Goal: Improve test coverage from 45% to 80%

**Step 1**: "@grok Audit test coverage"

**Step 2**: "@codex Write tests for uncovered modules"

**Step 3**: "@copilot Run coverage report"

**Step 4**: "@grok Verify coverage goals met"

**Step 5**: "@gemini Refactor hard-to-test code"

---

## Tips for Using These Workflows

1. **Always start with the right agent** - Match task to specialty
2. **Provide context** - Share files, requirements, constraints
3. **Chain agents** - Use output from one as input to next
4. **Iterate** - Don't expect perfection first try
5. **Review everything** - Agents assist, you decide

## Common Agent Combinations

- **New Feature**: Claude → Codex → Copilot → Grok → Gemini
- **Bug Fix**: Grok → Claude → Codex → Copilot
- **Refactor**: Grok → Gemini → Copilot
- **Code Review**: Grok → Codex → Gemini
- **Testing**: Codex → Copilot → Grok
