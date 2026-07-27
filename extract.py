import pypdf
import os

pdf_path = "مشروع كوشة (KOSHA).pdf"
output_path = "pdf_content.txt"

print(f"Reading PDF from: {pdf_path}")
reader = pypdf.PdfReader(pdf_path)
text = []
for i, page in enumerate(reader.pages):
    page_text = page.extract_text()
    text.append(f"--- Page {i+1} ---")
    text.append(page_text)

with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(text))

print(f"Text extracted to: {output_path}")
