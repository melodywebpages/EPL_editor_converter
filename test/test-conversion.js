// Simple test script to verify EPL to ZPL conversion
const fs = require('fs');

// Simulate the converter function
function convertEplToZpl(eplContent) {
  const warnings = [];
  let zpl = '^XA\n';

  const lines = eplContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  for (const line of lines) {
    const cleanLine = line.replace(/\r/g, '');

    // q command - Set label width (lowercase - must check first!)
    if (cleanLine.match(/^q(\d+)/i) && !cleanLine.match(/^Q/)) {
      const match = cleanLine.match(/^q(\d+)/i);
      if (match) {
        const width = parseInt(match[1]);
        zpl += `^PW${width}\n`;
      }
      continue;
    }

    // Q command - Set label height (uppercase)
    if (cleanLine.match(/^Q(\d+)/i)) {
      const match = cleanLine.match(/^Q(\d+)/i);
      if (match) {
        const height = parseInt(match[1]);
        zpl += `^LL${height}\n`;
      }
      continue;
    }

    // A command - ASCII text
    const aMatch = cleanLine.match(/^A(\d+),(\d+),(\d+),(\d+),(\d+),(\d+),(N|R),(.+)$/i);
    if (aMatch) {
      const x = aMatch[1];
      const y = aMatch[2];
      const rotation = aMatch[3];
      const font = aMatch[4];
      const hMult = aMatch[5];
      const vMult = aMatch[6];
      let text = aMatch[8];

      text = text.replace(/^["'](.*)["']$/, '$1');

      const zplRotation = ['N', 'R', 'I', 'B'][parseInt(rotation)] || 'N';
      const fontMap = { '1': '0', '2': 'A', '3': 'B', '4': 'D', '5': 'E' };
      const zplFont = fontMap[font] || '0';
      const fontHeight = parseInt(vMult) * 10;
      const fontWidth = parseInt(hMult) * 10;

      zpl += `^FO${x},${y}^A${zplFont}${zplRotation},${fontHeight},${fontWidth}^FD${text}^FS\n`;
      continue;
    }

    // B command - Barcode
    const bMatch = cleanLine.match(/^B(\d+),(\d+),(\d+),([^,]+),(\d+),(\d+),(\d+),(B|N),(.+)$/i);
    if (bMatch) {
      const x = bMatch[1];
      const y = bMatch[2];
      const rotation = bMatch[3];
      const barcodeType = bMatch[4];
      const narrowBar = bMatch[5];
      const height = bMatch[7];
      const humanReadable = bMatch[8];
      let data = bMatch[9];

      data = data.replace(/^["'](.*)["']$/, '$1');

      const zplRotation = ['N', 'R', 'I', 'B'][parseInt(rotation)] || 'N';
      const barcodeMap = { '1': '3', '2': 'E', '3': 'U', '4': 'E' };
      const zplBarcode = barcodeMap[barcodeType] || '3';
      const barWidth = Math.max(2, parseInt(narrowBar));

      zpl += `^FO${x},${y}^BY${barWidth},3,${height}^B${zplBarcode}${zplRotation},,${humanReadable === 'B' ? 'Y' : 'N'}^FD${data}^FS\n`;
      continue;
    }

    // D command - Density
    if (cleanLine.match(/^D(\d+)/i)) {
      const match = cleanLine.match(/^D(\d+)/i);
      if (match) {
        const density = parseInt(match[1]);
        const darkness = Math.min(30, density * 3);
        zpl += `^MD${darkness}\n`;
      }
      continue;
    }

    // P command - Print quantity
    if (cleanLine.match(/^P(\d+)/i)) {
      const match = cleanLine.match(/^P(\d+)/i);
      if (match) {
        const quantity = match[1];
        zpl += `^PQ${quantity}\n`;
      }
      continue;
    }

    // Skip N and L commands
    if (cleanLine.match(/^(N|L)$/i)) {
      continue;
    }
  }

  zpl += '^XZ\n';
  return { zpl, warnings };
}

// Test with the user's EPL
const eplContent = `N
q457
Q228,32,-16
D7
A12,18,0,2,1,1,R,ACME Co.
A100,45,0,1,2,2,N,$9.99
A20,80,0,3,1,1,N,Widget Model X
B30,110,0,1,2,7,70,B,123456789012
L
P1`;

console.log('EPL Input:');
console.log('==========');
console.log(eplContent);
console.log('\n');

const result = convertEplToZpl(eplContent);

console.log('ZPL Output:');
console.log('===========');
console.log(result.zpl);
console.log('\n');

if (result.warnings.length > 0) {
  console.log('Warnings:');
  console.log('=========');
  result.warnings.forEach(w => console.log('- ' + w));
}

// Save the ZPL output
fs.writeFileSync('test-output.zpl', result.zpl);
console.log('ZPL saved to test/test-output.zpl');

