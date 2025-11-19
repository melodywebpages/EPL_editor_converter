# Changelog

## Version 1.1 - EPL Parser Improvements

### Fixed Issues

#### 1. **Text Field Parsing (A command)**
- **Problem**: Only parsed text fields with quotes (e.g., `"text"`)
- **Solution**: Now handles both quoted and unquoted text
- **Example**: Both `A12,18,0,2,1,1,R,"ACME Co."` and `A12,18,0,2,1,1,R,ACME Co.` work correctly

#### 2. **Barcode Parsing (B command)**
- **Problem**: Required quotes around barcode data
- **Solution**: Handles both formats flexibly
- **Example**: `B30,110,0,1,2,7,70,B,123456789012` now works without quotes

#### 3. **Label Dimensions (Q and q commands)**
- **Problem**: Both `Q` and `q` were being confused due to case-insensitive matching
- **Solution**: Properly distinguishes between:
  - `q###` - Sets label **width** (generates `^PW` in ZPL)
  - `Q###` - Sets label **height** (generates `^LL` in ZPL)
- **Example**: `q457` + `Q228` now correctly produces `^PW457` + `^LL228`

#### 4. **Additional Commands**
Added support for:
- **D command** - Density setting (converts to `^MD` media darkness in ZPL)
- **L command** - Print label (legacy EPL, handled automatically)
- **S command** - Speed setting (converts to `^PR` print rate)

### Test Results

**Input EPL:**
```epl
N
q457
Q228,32,-16
D7
A12,18,0,2,1,1,R,ACME Co.
A100,45,0,1,2,2,N,$9.99
A20,80,0,3,1,1,N,Widget Model X
B30,110,0,1,2,7,70,B,123456789012
L
P1
```

**Generated ZPL:**
```zpl
^XA
^PW457
^LL228
^MD21
^FO12,18^AAN,10,10^FDACME Co.^FS
^FO100,45^A0N,20,20^FD$9.99^FS
^FO20,80^ABN,10,10^FDWidget Model X^FS
^FO30,110^BY2,3,70^B3N,,Y^FD123456789012^FS
^PQ1
^XZ
```

### New Features

1. **Debug Mode** - Shows generated ZPL in the UI when conversion fails
2. **Test API Endpoint** - Added `/api/test-zpl` to verify Labelary connectivity
3. **Better Error Messages** - More detailed error information including:
   - HTTP status codes
   - API URL used
   - Generated ZPL for debugging
   - Conversion warnings

### Improvements

- Font size calculation now uses both horizontal and vertical multipliers
- Bar width calculated from narrow bar parameter
- Better handling of label dimension limits (safety caps)
- Case-sensitive command parsing for Q/q distinction
- More robust regex patterns for EPL command parsing

---

## Version 1.0 - Initial Release

- Basic EPL to ZPL conversion
- PDF and PNG output via Labelary API
- Modern Next.js UI with drag-and-drop
- Support for common EPL commands

