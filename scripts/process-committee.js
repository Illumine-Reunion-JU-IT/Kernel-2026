const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcDir = 'C:\\Users\\Ritabrata\\.gemini\\antigravity\\scratch\\committee_extracted\\Positions Of Responsibilities';
const outDir = 'C:\\Users\\Ritabrata\\.gemini\\antigravity\\scratch\\Kernel-2026\\public\\images\\core-committee';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const members = [
  { id: 'rishav-chowdhury', file: '1 (1).png', name: 'Rishav Chowdhury', isIllumine: false },
  { id: 'anuska-nath', file: '13.png', name: 'Anuska Nath', isIllumine: true },
  { id: 'ansh-kumar-singh', file: '12.png', name: 'Ansh Kumar Singh', isIllumine: true },
  { id: 'tanishq-majumder', file: '14.png', name: 'Tanishq Majumder', isIllumine: true },
  { id: 'rahul-pandey', file: '3 (1).png', name: 'Rahul Pandey', isIllumine: false },
  { id: 'debarun-patra', file: '5 (1).png', name: 'Debarun Patra', isIllumine: false },
  { id: 'saptarshi-sau', file: '6 (1).png', name: 'Saptarshi Sau', isIllumine: false },
  { id: 'aritra-mondal', file: '1.png', name: 'Aritra Mondal', isIllumine: true },
  { id: 'syed-hasan-farhan', file: '8 (1).png', name: 'Syed Hasan Farhan', isIllumine: false },
  { id: 'yasir-ahmad', file: '9 (1).png', name: 'Yasir Ahmad', isIllumine: false },
  { id: 'sourav-dutta', file: '10 (1).png', name: 'Sourav Dutta', isIllumine: false },
  { id: 'reetabrata-mandal', file: '11 (1).png', name: 'Reetabrata Mandal', isIllumine: false },
  { id: 'iman-rout', file: '12 (1).png', name: 'Iman Rout', isIllumine: false },
];

async function run() {
  console.log('Starting committee image extraction...');
  for (const m of members) {
    const srcFile = path.join(srcDir, m.file);
    if (!fs.existsSync(srcFile)) {
      console.error('File not found:', srcFile);
      continue;
    }

    // 1. Save full poster
    const posterPath = path.join(outDir, `${m.id}-poster.png`);
    fs.copyFileSync(srcFile, posterPath);

    // 2. Crop portrait (removes side template/placeholder texts)
    // 1836 x 2295
    // Polaroid card frame is centered with left text strip taking ~15%
    // Inner portrait crop:
    const cropX = Math.round(1836 * 0.24);
    const cropY = Math.round(2295 * 0.30);
    const cropW = Math.round(1836 * 0.52);
    const cropH = Math.round(2295 * 0.50);

    const portraitPath = path.join(outDir, `${m.id}.jpg`);
    await sharp(srcFile)
      .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
      .resize(600, 600, { fit: 'cover' })
      .jpeg({ quality: 92 })
      .toFile(portraitPath);

    console.log(`Successfully generated portrait for ${m.name} -> ${m.id}.jpg`);
  }
  console.log('All committee images processed successfully!');
}

run().catch(console.error);
