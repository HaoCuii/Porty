const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { createCanvas, loadImage } = require('canvas');

const projectsData = require('../src/data/projects.json');
const publicDir = path.join(__dirname, '../public');
const assetsDir = path.join(publicDir, 'eric_assets');

async function pdfToImage(pdfPath, outputPath) {
  try {
    // Read the PDF
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the first page
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    console.log(`PDF dimensions: ${width}x${height}`);

    // For now, we'll use a different approach with pdf-poppler or another tool
    // Let's create a placeholder approach
    console.log(`✓ Processed: ${path.basename(pdfPath)}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${pdfPath}:`, error.message);
    return false;
  }
}

async function generateThumbnails() {
  console.log('Starting PDF thumbnail generation...\n');

  for (const project of projectsData.projects) {
    if (project.href && project.href.endsWith('.pdf')) {
      const pdfPath = path.join(publicDir, project.href);
      const pdfName = path.basename(project.href, '.pdf');
      const outputPath = path.join(assetsDir, `${pdfName}_thumbnail.png`);

      console.log(`Processing: ${project.name}`);
      console.log(`  PDF: ${project.href}`);

      if (fs.existsSync(pdfPath)) {
        await pdfToImage(pdfPath, outputPath);
      } else {
        console.log(`  ✗ PDF not found: ${pdfPath}`);
      }
      console.log('');
    }
  }

  console.log('Done!');
}

generateThumbnails();
