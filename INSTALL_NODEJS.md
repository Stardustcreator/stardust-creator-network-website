# Installing Node.js and npm

## Quick Installation Guide

### Step 1: Download Node.js
1. Go to: **https://nodejs.org/**
2. Download the **LTS (Long Term Support)** version for Windows
3. Choose the Windows Installer (.msi) - 64-bit version

### Step 2: Install Node.js
1. Run the downloaded installer
2. Follow the installation wizard
3. **Important:** Make sure to check "Add to PATH" option during installation
4. Complete the installation

### Step 3: Verify Installation
After installation, **close and reopen** your PowerShell terminal, then run:

```powershell
node --version
npm --version
```

You should see version numbers (e.g., `v20.11.0` and `10.2.4`)

### Step 4: Install Project Dependencies
Once Node.js is installed, navigate to your project and install dependencies:

```powershell
cd c:\Users\DELL\.cursor\stardust-creator-network-website
npm install
```

### Step 5: Start Development Server
```powershell
npm run dev
```

The server will start at `http://localhost:3000`

---

## Alternative: Using Chocolatey (if you have it)

If you have Chocolatey package manager installed:

```powershell
choco install nodejs-lts
```

Then restart your terminal and verify with `node --version` and `npm --version`.

---

## Troubleshooting

**If npm still isn't recognized after installation:**
1. Close all PowerShell/terminal windows
2. Open a new PowerShell window as Administrator
3. Check if Node.js is installed: `Test-Path "C:\Program Files\nodejs\node.exe"`
4. If it exists, add to PATH manually:
   ```powershell
   $env:PATH += ";C:\Program Files\nodejs"
   ```
5. Or restart your computer to ensure PATH is updated

**If you need to check your PATH:**
```powershell
$env:PATH -split ';' | Select-String -Pattern "node"
```

---

## What You'll Need

- **Node.js version:** 18.17.0 or later (as specified in package.json)
- **npm version:** 8.0.0 or later

The LTS version from nodejs.org will include both Node.js and npm.
