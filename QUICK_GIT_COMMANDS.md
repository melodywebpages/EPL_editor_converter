# Quick Git Commands Reference

## 🚀 Initial Setup (Do Once)

```powershell
# Navigate to project
cd C:\Users\aryel\OneDrive\Desktop\sites\epl-pdf-zpl

# Initialize git
git init

# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# First commit
git commit -m "Initial commit: EPL Editor & Converter"

# Connect to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/epl-editor-converter.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📤 Push Changes (Computer A)

```powershell
# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "Describe your changes here"

# Push to GitHub
git push
```

---

## 📥 Pull Changes (Computer B)

```powershell
# Before starting work, get latest changes
git pull

# If package.json changed, reinstall dependencies
npm install

# Start working
npm run dev
```

---

## 🔄 Daily Workflow

```powershell
# When you START working:
git pull                    # Get latest changes
npm install                 # Update dependencies if needed
npm run dev                 # Start development

# When you FINISH working:
git add .                   # Stage all changes
git commit -m "Your message" # Commit changes
git push                    # Push to GitHub
```

---

## 🆘 Emergency Commands

```powershell
# Undo changes to a file (before commit)
git restore filename.tsx

# Undo all changes (before commit)
git restore .

# See what changed
git diff

# See commit history
git log --oneline

# Pull with merge if conflicts
git pull --rebase
```

---

## 🌐 Clone on New Computer

```powershell
# Clone repository
git clone https://github.com/YOUR-USERNAME/epl-editor-converter.git

# Go into project
cd epl-editor-converter

# Install dependencies
npm install

# Run project
npm run dev
```

---

## 💡 Pro Tips

1. **Always `git pull` before starting work**
2. **Commit often with clear messages**
3. **Push at end of work session**
4. **Never commit `node_modules` (already in .gitignore)**
5. **Use meaningful commit messages**

---

## ✅ Example Messages

```
Good:
✓ "Add live preview feature to EPL editor"
✓ "Fix bug in ZPL barcode conversion"
✓ "Update Privacy Policy for GDPR compliance"
✓ "Improve mobile responsiveness on preview panel"

Bad:
✗ "fixed stuff"
✗ "update"
✗ "changes"
✗ "asdf"
```

---

**Bookmark this file for quick reference!**

