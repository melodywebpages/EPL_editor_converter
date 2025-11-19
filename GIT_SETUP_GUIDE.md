# Git & GitHub Setup Guide

Complete guide to push your EPL Editor & Converter project to GitHub and work on it from multiple computers.

---

## 📋 Prerequisites

Before starting, make sure you have:
- [x] Git installed on your computer
- [x] GitHub account created (sign up at https://github.com)
- [x] Terminal/Command Prompt access

### Check if Git is Installed

```bash
git --version
```

If not installed, download from: https://git-scm.com/downloads

---

## 🚀 Step 1: Initialize Git Repository

Open your terminal in the project folder:

```bash
# Navigate to your project folder
cd C:\Users\aryel\OneDrive\Desktop\sites\epl-pdf-zpl

# Initialize git repository
git init

# Check status
git status
```

---

## 📝 Step 2: Configure Git (First Time Only)

Set your name and email (used for commits):

```bash
# Replace with your actual name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global --list
```

---

## 🔒 Step 3: Review .gitignore

Your project already has a `.gitignore` file. Let's verify it's correct:

```bash
# View .gitignore contents
type .gitignore
```

The file should ignore:
- `/node_modules` (dependencies - will be reinstalled)
- `/.next` (build files)
- `.env*.local` (sensitive environment variables)
- Test output files

✅ Your `.gitignore` is already set up correctly!

---

## 📦 Step 4: Stage All Files

Add all your project files to git:

```bash
# Add all files (respects .gitignore)
git add .

# Check what will be committed
git status
```

You should see:
- Green text = files ready to commit
- Red text = untracked files (if any)

---

## 💾 Step 5: Create Initial Commit

```bash
# Create your first commit
git commit -m "Initial commit: EPL Editor & Converter with live preview and multi-format export"

# Verify commit was created
git log --oneline
```

---

## 🌐 Step 6: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. **Go to GitHub**: https://github.com
2. **Click** the "+" icon (top right) → "New repository"
3. **Fill in details**:
   - **Repository name**: `epl-editor-converter` (or your preferred name)
   - **Description**: "Free online EPL editor with live preview. Edit, convert EPL to ZPL/PDF/PNG"
   - **Visibility**: 
     - ✅ **Public** (recommended - free, anyone can see)
     - ⚠️ **Private** (only you can see - free for personal accounts)
   - **DON'T** initialize with README, .gitignore, or license (we already have these)
4. **Click** "Create repository"

### Option B: Using GitHub CLI (Advanced)

```bash
gh repo create epl-editor-converter --public --source=. --remote=origin
```

---

## 🔗 Step 7: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see setup instructions. Run these commands:

```bash
# Add GitHub repository as remote origin
# Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/epl-editor-converter.git

# Verify remote was added
git remote -v
```

Example:
```bash
git remote add origin https://github.com/johndoe/epl-editor-converter.git
```

---

## 🚀 Step 8: Push to GitHub

```bash
# Push your code to GitHub (main branch)
git branch -M main
git push -u origin main
```

**First time pushing?** You'll be prompted to authenticate:
- **Option 1**: Browser authentication (recommended)
- **Option 2**: Personal Access Token
- **Option 3**: GitHub Desktop

After successful push, visit your repository:
```
https://github.com/YOUR-USERNAME/epl-editor-converter
```

---

## 💻 Step 9: Clone on Another Computer

On your other computer:

### 1. Install Prerequisites
```bash
# Check Git
git --version

# Check Node.js (need v18+)
node --version
npm --version
```

### 2. Clone the Repository
```bash
# Navigate to where you want the project
cd C:\Users\YourName\Desktop

# Clone the repository
git clone https://github.com/YOUR-USERNAME/epl-editor-converter.git

# Navigate into project
cd epl-editor-converter
```

### 3. Install Dependencies
```bash
# Install all npm packages
npm install
```

### 4. Run the Project
```bash
# Start development server
npm run dev
```

Visit: http://localhost:3000

---

## 🔄 Step 10: Daily Workflow

### When Making Changes on Computer A:

```bash
# 1. Check current status
git status

# 2. Stage changed files
git add .
# Or stage specific files:
# git add app/page.tsx utils/eplToZpl.ts

# 3. Commit changes with meaningful message
git commit -m "Add support for additional EPL commands"

# 4. Push to GitHub
git push
```

### Before Starting Work on Computer B:

```bash
# 1. Pull latest changes
git pull

# 2. Install any new dependencies (if package.json changed)
npm install

# 3. Start working
npm run dev
```

---

## 🛠️ Common Git Commands

### Status & Information
```bash
git status              # See current changes
git log                 # View commit history
git log --oneline       # Compact commit history
git diff                # See changes before staging
git remote -v           # View remote repositories
```

### Making Changes
```bash
git add <file>          # Stage specific file
git add .               # Stage all changes
git commit -m "message" # Commit staged changes
git push                # Push to GitHub
git pull                # Pull from GitHub
```

### Branching (Advanced)
```bash
git branch              # List branches
git branch feature-xyz  # Create new branch
git checkout feature-xyz # Switch to branch
git merge feature-xyz   # Merge branch into current
```

### Undo Changes
```bash
git restore <file>      # Discard changes in file
git restore .           # Discard all changes
git reset HEAD~1        # Undo last commit (keep changes)
git reset --hard HEAD~1 # Undo last commit (delete changes)
```

---

## 📝 Recommended Commit Message Format

```bash
# Good commit messages:
git commit -m "Add cookie consent banner for GDPR compliance"
git commit -m "Fix preview not updating after EPL edit"
git commit -m "Update Privacy Policy with editor features"
git commit -m "Improve mobile responsiveness on preview panel"

# Bad commit messages (avoid):
git commit -m "fixed stuff"
git commit -m "update"
git commit -m "changes"
```

---

## 🔐 GitHub Authentication Options

### Option 1: HTTPS with Token (Recommended)

1. **Generate Personal Access Token**:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo` (full control)
   - Copy the token (save it securely!)

2. **Use token as password** when pushing:
   ```bash
   git push
   # Username: your-github-username
   # Password: paste-your-token-here
   ```

### Option 2: SSH (Advanced)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Copy public key
type ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH Keys → New SSH Key

# Change remote to SSH
git remote set-url origin git@github.com:YOUR-USERNAME/epl-editor-converter.git
```

### Option 3: GitHub Desktop (Easiest)

Download: https://desktop.github.com/
- Visual interface for Git
- No command line needed
- Handles authentication automatically

---

## 🚨 Common Issues & Solutions

### Issue: "fatal: not a git repository"
**Solution**: Run `git init` in project folder

### Issue: "failed to push some refs"
**Solution**: Pull first, then push
```bash
git pull --rebase
git push
```

### Issue: "Authentication failed"
**Solution**: Use Personal Access Token as password, not your GitHub password

### Issue: Merge conflicts
**Solution**: 
```bash
# Pull with conflicts
git pull

# Edit conflicted files (look for <<<<<<< markers)
# After fixing:
git add .
git commit -m "Resolve merge conflicts"
git push
```

### Issue: Accidentally committed node_modules
**Solution**:
```bash
# Remove from git but keep locally
git rm -r --cached node_modules
git commit -m "Remove node_modules from git"
git push
```

---

## 📚 .gitignore Best Practices

Your project already has a good `.gitignore`. Never commit:
- ❌ `/node_modules` - Dependencies (too large)
- ❌ `.env` files - Secrets and API keys
- ❌ `/.next` - Build artifacts
- ❌ Personal editor settings
- ❌ OS files (.DS_Store on Mac)
- ✅ Source code
- ✅ Configuration files
- ✅ Documentation
- ✅ package.json and package-lock.json

---

## 🎯 Workflow Example

**Scenario**: You're working on two computers - Home PC and Office PC

### Monday Morning (Home PC):
```bash
# Start fresh
git pull
npm install
npm run dev

# Make changes to add new feature
# ... edit files ...

# Commit and push
git add .
git commit -m "Add barcode rotation support"
git push
```

### Monday Afternoon (Office PC):
```bash
# Get your morning work
git pull
npm install  # if needed

# Continue working
# ... edit files ...

# Commit and push
git add .
git commit -m "Add tests for barcode rotation"
git push
```

### Monday Evening (Home PC):
```bash
# Get your afternoon work
git pull

# Keep working
# ... etc ...
```

---

## 🎓 Learning Resources

- **GitHub Docs**: https://docs.github.com
- **Git Tutorial**: https://www.atlassian.com/git/tutorials
- **Interactive Learning**: https://learngitbranching.js.org
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

## ✅ Quick Start Checklist

- [ ] Git installed and configured
- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Local repository initialized (`git init`)
- [ ] Files committed (`git add .` and `git commit`)
- [ ] Remote added (`git remote add origin`)
- [ ] Code pushed to GitHub (`git push`)
- [ ] Successfully cloned on second computer
- [ ] Dependencies installed (`npm install`)
- [ ] Project running (`npm run dev`)

---

## 🆘 Need Help?

If you get stuck:
1. Check error messages carefully
2. Google the exact error message
3. Ask ChatGPT or Claude for help
4. Check GitHub Community: https://github.community
5. Stack Overflow: https://stackoverflow.com/questions/tagged/git

---

**Ready to push?** Start with Step 1! 🚀

Good luck! Your code will be safely backed up on GitHub and accessible from any computer.

