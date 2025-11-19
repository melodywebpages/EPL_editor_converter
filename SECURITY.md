# Security Policy

## 🔒 Security Features

This application implements the following security measures:

### 1. **Security Headers**
- ✅ Strict-Transport-Security (HSTS)
- ✅ X-Frame-Options (Clickjacking protection)
- ✅ X-Content-Type-Options (MIME-sniffing protection)
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### 2. **Rate Limiting**
- ✅ 60 requests per minute per IP address
- ✅ Applied to all API endpoints
- ✅ Automatic IP-based throttling

### 3. **Data Protection**
- ✅ No file storage (files deleted after processing)
- ✅ Client-side processing for editing
- ✅ No sensitive data logging
- ✅ HTTPS enforced (automatic on Cloud Run)

### 4. **Docker Security**
- ✅ Non-root user (nextjs:nodejs)
- ✅ Minimal Alpine Linux base
- ✅ No unnecessary packages
- ✅ Standalone build (smaller attack surface)

### 5. **Input Validation**
- ✅ File type validation
- ✅ File size limits
- ✅ Content-Type verification

---

## 🐛 Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email: security@yourdomain.com (update with your actual email)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours.

---

## 🔄 Security Updates

We regularly update dependencies to patch security vulnerabilities:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update all dependencies
npm update
```

---

## ✅ Security Checklist for Production

- [x] HTTPS enabled (automatic on Cloud Run)
- [x] Security headers configured
- [x] Rate limiting enabled
- [x] No secrets in code
- [x] Environment variables for configuration
- [x] Docker non-root user
- [x] Dependencies up to date
- [x] Error messages don't expose internals
- [x] CORS configured properly
- [x] No sensitive data in logs

---

## 📚 Security Best Practices

### For Administrators:

1. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm update
   ```

2. **Monitor Logs**
   ```bash
   gcloud run logs tail epl-editor-converter --region us-central1
   ```

3. **Review Access**
   - Limit who can deploy
   - Use IAM roles properly
   - Enable 2FA on Google Cloud

4. **Regular Backups**
   - Code backed up on GitHub
   - No database (stateless)

### For Users:

1. **Don't upload sensitive files**
2. **Use secure connection (HTTPS)**
3. **Report suspicious activity**

---

## 📞 Contact

Security concerns: security@yourdomain.com (update with your actual email)

---

Last Updated: 2024-11-19

