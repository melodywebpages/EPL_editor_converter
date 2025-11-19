/**
 * EPL to ZPL Converter
 * Converts EPL (Eltron Programming Language) commands to ZPL (Zebra Programming Language)
 * 
 * Note: This is a basic converter covering common EPL commands.
 * Complex or proprietary EPL commands may not be fully supported.
 */

export interface ConversionResult {
  zpl: string;
  warnings: string[];
}

export function convertEplToZpl(eplContent: string): ConversionResult {
  const warnings: string[] = [];
  let zpl = '^XA\n'; // ZPL format start

  // Clean up the EPL content
  const lines = eplContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  // EPL label dimensions (default: 4x6 inches)
  let labelWidth = 4;
  let labelHeight = 6;
  let dpmm = 8; // dots per mm

  for (const line of lines) {
    try {
      // Remove any carriage returns
      const cleanLine = line.replace(/\r/g, '');

      // EPL Command conversions
      
      // q command - Set label width (lowercase - must check FIRST before Q!)
      if (cleanLine.match(/^q(\d+)/) && !cleanLine.match(/^Q/)) {
        const match = cleanLine.match(/^q(\d+)/);
        if (match) {
          const width = parseInt(match[1]);
          labelWidth = width / 203; // Convert dots to inches
          zpl += `^PW${width}\n`; // Set print width in dots
        }
        continue;
      }

      // Q command - Set label height (length) - UPPERCASE only
      // Format: Q### or Q###,### (height, gap)
      if (cleanLine.match(/^Q(\d+)/)) {
        const match = cleanLine.match(/^Q(\d+)/);
        if (match) {
          const height = parseInt(match[1]);
          labelHeight = height / 203; // Convert dots to inches
          zpl += `^LL${height}\n`; // Set label length in dots
        }
        continue;
      }

      // A command - ASCII text
      // Format: Ax,y,rotation,font,h-mult,v-mult,N/R,data (with or without quotes)
      const aMatch = cleanLine.match(/^A(\d+),(\d+),(\d+),(\d+),(\d+),(\d+),(N|R),(.+)$/i);
      if (aMatch) {
        const x = aMatch[1];
        const y = aMatch[2];
        const rotation = aMatch[3];
        const font = aMatch[4];
        const hMult = aMatch[5];
        const vMult = aMatch[6];
        const reverse = aMatch[7];
        let text = aMatch[8];

        // Remove quotes if present
        text = text.replace(/^["'](.*)["']$/, '$1');

        // Convert rotation (EPL: 0=0°, 1=90°, 2=180°, 3=270°)
        const zplRotation = ['N', 'R', 'I', 'B'][parseInt(rotation)] || 'N';
        
        // Map EPL fonts to ZPL fonts
        const fontMap: { [key: string]: string } = {
          '1': '0', // 8pt
          '2': 'A', // 10pt
          '3': 'B', // 12pt
          '4': 'D', // 24pt
          '5': 'E', // 30pt
        };
        const zplFont = fontMap[font] || '0';

        // Calculate font size based on multipliers
        const fontHeight = parseInt(vMult) * 10;
        const fontWidth = parseInt(hMult) * 10;

        zpl += `^FO${x},${y}^A${zplFont}${zplRotation},${fontHeight},${fontWidth}^FD${text}^FS\n`;
        continue;
      }

      // B command - Bar code
      // Format: Bx,y,rotation,barcode-type,narrow-bar,wide-bar,height,human-readable,data (with or without quotes)
      const bMatch = cleanLine.match(/^B(\d+),(\d+),(\d+),([^,]+),(\d+),(\d+),(\d+),(B|N),(.+)$/i);
      if (bMatch) {
        const x = bMatch[1];
        const y = bMatch[2];
        const rotation = bMatch[3];
        const barcodeType = bMatch[4];
        const narrowBar = bMatch[5];
        const wideBar = bMatch[6];
        const height = bMatch[7];
        const humanReadable = bMatch[8];
        let data = bMatch[9];

        // Remove quotes if present
        data = data.replace(/^["'](.*)["']$/, '$1');

        // Convert rotation
        const zplRotation = ['N', 'R', 'I', 'B'][parseInt(rotation)] || 'N';

        // Map EPL barcode types to ZPL
        const barcodeMap: { [key: string]: string } = {
          '1': '3', // Code 39
          '2': 'E', // Code 128
          '3': 'U', // UPC-A
          '4': 'E', // EAN-13
          '1A': '3', // Code 39 with check digit
          '2C': 'C', // Code 128 Auto
        };
        const zplBarcode = barcodeMap[barcodeType.toUpperCase()] || '3';

        // Use narrow/wide bar for bar width
        const barWidth = Math.max(2, parseInt(narrowBar));

        zpl += `^FO${x},${y}^BY${barWidth},3,${height}^B${zplBarcode}${zplRotation},,${humanReadable === 'B' ? 'Y' : 'N'}^FD${data}^FS\n`;
        continue;
      }

      // LO command - Line draw (black)
      // Format: LOx,y,width,height
      if (cleanLine.match(/^LO(\d+),(\d+),(\d+),(\d+)/i)) {
        const match = cleanLine.match(/^LO(\d+),(\d+),(\d+),(\d+)/i);
        if (match) {
          const x = match[1];
          const y = match[2];
          const width = match[3];
          const height = match[4];
          zpl += `^FO${x},${y}^GB${width},${height},${Math.min(parseInt(width), parseInt(height))}^FS\n`;
        }
        continue;
      }

      // LS command - Line draw (diagonal)
      // Format: LSx1,y1,x2,y2
      if (cleanLine.match(/^LS(\d+),(\d+),(\d+),(\d+)/i)) {
        const match = cleanLine.match(/^LS(\d+),(\d+),(\d+),(\d+)/i);
        if (match) {
          warnings.push(`Diagonal lines (LS command) are not directly supported in ZPL. Using rectangle approximation.`);
          const x1 = parseInt(match[1]);
          const y1 = parseInt(match[2]);
          const x2 = parseInt(match[3]);
          const y2 = parseInt(match[4]);
          const width = Math.abs(x2 - x1);
          const height = Math.abs(y2 - y1);
          zpl += `^FO${x1},${y1}^GB${width},${height},2^FS\n`;
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

      // N command - Clear image buffer (start new label)
      if (cleanLine.match(/^N$/i)) {
        // Already handled by ^XA at the beginning
        continue;
      }

      // D command - Density setting
      if (cleanLine.match(/^D(\d+)/i)) {
        const match = cleanLine.match(/^D(\d+)/i);
        if (match) {
          const density = parseInt(match[1]);
          // EPL density: 7=8dpmm, 8=12dpmm
          // This affects print darkness in ZPL
          const darkness = Math.min(30, density * 3);
          zpl += `^MD${darkness}\n`; // Media darkness
        }
        continue;
      }

      // L command - Print label (legacy EPL)
      if (cleanLine.match(/^L$/i)) {
        // This is handled by ^XZ at the end
        continue;
      }

      // S command - Speed setting
      if (cleanLine.match(/^S(\d+)/i)) {
        const match = cleanLine.match(/^S(\d+)/i);
        if (match) {
          const speed = match[1];
          zpl += `^PR${speed}\n`; // Print rate
        }
        continue;
      }

      // If line is not recognized, add a warning
      if (cleanLine.length > 0 && !cleanLine.match(/^(Q|q|A|B|LO|LS|P|N|D|L|S)/i)) {
        warnings.push(`Unrecognized or unsupported EPL command: ${cleanLine.substring(0, 50)}`);
      }

    } catch (error) {
      warnings.push(`Error processing line: ${line.substring(0, 50)} - ${error}`);
    }
  }

  zpl += '^XZ\n'; // ZPL format end

  return {
    zpl,
    warnings
  };
}

export function getLabelDimensions(eplContent: string): { width: number, height: number, dpmm: number } {
  // Default label size (4x6 inches at 8dpmm)
  let width = 4;
  let height = 6;
  let dpmm = 8;

  const lines = eplContent.split('\n');
  
  for (const line of lines) {
    const cleanLine = line.trim();
    
    // q command sets label width (lowercase - check first!)
    if (cleanLine.match(/^q(\d+)/) && !cleanLine.match(/^Q/)) {
      const match = cleanLine.match(/^q(\d+)/);
      if (match) {
        const dots = parseInt(match[1]);
        width = Math.round((dots / 203) * 10) / 10;
        // Ensure minimum width
        if (width < 1) width = 1;
        if (width > 8) width = 8; // Cap at reasonable size
      }
    }

    // Q command sets label height (uppercase, format: Q###[,###[,###]])
    if (cleanLine.match(/^Q(\d+)/)) {
      const match = cleanLine.match(/^Q(\d+)/);
      if (match) {
        const dots = parseInt(match[1]);
        height = Math.round((dots / 203) * 10) / 10; // Convert dots to inches, round to 1 decimal
        // Ensure minimum height
        if (height < 1) height = 1;
        if (height > 12) height = 12; // Cap at reasonable size
      }
    }

    // D command indicates density
    const dMatch = cleanLine.match(/^D(\d+)/i);
    if (dMatch) {
      const densityCode = parseInt(dMatch[1]);
      // EPL density codes: 6=6dpmm, 7=8dpmm, 8=12dpmm
      if (densityCode >= 8) {
        dpmm = 12;
      } else if (densityCode >= 7) {
        dpmm = 8;
      } else {
        dpmm = 6;
      }
    }
  }

  return { width, height, dpmm };
}

