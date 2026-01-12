import os
import json
import fitz  # PyMuPDF
from pathlib import Path

# Get the project root directory
script_dir = Path(__file__).parent
project_root = script_dir.parent

# Load projects data
projects_file = project_root / 'src' / 'data' / 'projects.json'
with open(projects_file, 'r', encoding='utf-8') as f:
    projects_data = json.load(f)

public_dir = project_root / 'public'
assets_dir = public_dir / 'eric_assets'

def pdf_to_image(pdf_path, output_path):
    """Convert first page of PDF to PNG image."""
    try:
        # Open the PDF
        doc = fitz.open(pdf_path)

        # Get the first page
        page = doc[0]

        # Render page to an image (matrix for scaling, default is 72 DPI)
        # Increase the scale for better quality (2.0 = 144 DPI)
        mat = fitz.Matrix(2.0, 2.0)
        pix = page.get_pixmap(matrix=mat)

        # Save as PNG
        pix.save(output_path)

        doc.close()

        print(f"Generated: {output_path.name}")
        return True

    except Exception as e:
        print(f"Error processing {pdf_path.name}: {str(e)}")
        return False

def main():
    print("Starting PDF thumbnail generation...\n")

    updates = []

    for project in projects_data['projects']:
        href = project.get('href', '')

        if href and href.endswith('.pdf'):
            pdf_path = public_dir / href.lstrip('/')
            pdf_name = pdf_path.stem
            output_filename = f"{pdf_name}_thumbnail.png"
            output_path = assets_dir / output_filename
            new_image_path = f"/eric_assets/{output_filename}"

            print(f"Processing: {project['name']}")

            if pdf_path.exists():
                success = pdf_to_image(pdf_path, output_path)
                if success:
                    updates.append({
                        'name': project['name'],
                        'oldImage': project.get('image', ''),
                        'newImage': new_image_path
                    })
            else:
                print(f"  PDF not found: {pdf_path}")
            print()

    # Print summary
    print("\n=== Summary ===")
    print(f"Generated {len(updates)} thumbnails")
    print("\nImage path updates needed:")
    for update in updates:
        print(f"  {update['name']}:")
        print(f"    Old: {update['oldImage']}")
        print(f"    New: {update['newImage']}")

    print("\nDone!")

if __name__ == '__main__':
    main()
