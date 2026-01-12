import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read projects data
const projectsDataRaw = fs.readFileSync(
  path.join(__dirname, '../src/data/projects.json'),
  'utf-8'
);
const projectsData = JSON.parse(projectsDataRaw);

const publicDir = path.join(__dirname, '../public');
const assetsDir = path.join(publicDir, 'eric_assets');

async function pdfToImage(pdfPath, outputPath) {
  try {
    // Read the PDF file
    const data = new Uint8Array(fs.readFileSync(pdfPath));

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdfDocument = await loadingTask.promise;

    // Get the first page
    const page = await pdfDocument.getPage(1);

    // Set scale for good quality (2x for retina displays)
    const scale = 2.0;
    const viewport = page.getViewport({ scale });

    // Create canvas
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    // Render the page
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    console.log(`✓ Generated: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(pdfPath)}:`, error.message);
    return false;
  }
}

async function generateThumbnails() {
  console.log('Starting PDF thumbnail generation...\n');

  const updates = [];

  for (const project of projectsData.projects) {
    if (project.href && project.href.endsWith('.pdf')) {
      const pdfPath = path.join(publicDir, project.href);
      const pdfName = path.basename(project.href, '.pdf');
      const outputFilename = `${pdfName}_thumbnail.png`;
      const outputPath = path.join(assetsDir, outputFilename);
      const newImagePath = `/eric_assets/${outputFilename}`;

      console.log(`Processing: ${project.name}`);

      if (fs.existsSync(pdfPath)) {
        const success = await pdfToImage(pdfPath, outputPath);
        if (success) {
          updates.push({
            name: project.name,
            oldImage: project.image,
            newImage: newImagePath,
          });
        }
      } else {
        console.log(`  ✗ PDF not found: ${pdfPath}`);
      }
      console.log('');
    }
  }

  // Print summary
  console.log('\n=== Summary ===');
  console.log(`Generated ${updates.length} thumbnails`);
  console.log('\nImage path updates needed:');
  updates.forEach((update) => {
    console.log(`  ${update.name}:`);
    console.log(`    Old: ${update.oldImage}`);
    console.log(`    New: ${update.newImage}`);
  });

  console.log('\nDone!');
}

generateThumbnails().catch(console.error);
