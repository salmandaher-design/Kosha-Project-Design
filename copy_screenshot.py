import shutil
import os

src = r"C:\Users\ASUS\.gemini\antigravity\brain\bb75dc24-362f-4cea-801b-8543f7916bb0\.system_generated\click_feedback\click_feedback_1784648034509.png"
dst = r"C:\Users\ASUS\.gemini\antigravity\brain\bb75dc24-362f-4cea-801b-8543f7916bb0\logo_3d_preview.png"

print(f"Copying {src} to {dst}")
if os.path.exists(src):
    shutil.copy(src, dst)
    print("Copy completed successfully.")
else:
    print("Source file not found.")
