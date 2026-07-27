import cv2
import numpy as np

# Load the image
img = cv2.imread("logo.png", cv2.IMREAD_UNCHANGED)
print("Original image shape:", img.shape)

# Check if we have alpha channel
if len(img.shape) == 3 and img.shape[2] == 4:
    # Use alpha channel as mask
    mask = img[:, :, 3]
else:
    # Convert to grayscale and threshold
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

# Smooth the mask to remove jagged pixel edges
# Gaussian Blur followed by thresholding creates smooth, rounded curves
blurred = cv2.GaussianBlur(mask, (7, 7), 0)
_, smooth_mask = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY)

# Find contours on the smoothed mask
contours, hierarchy = cv2.findContours(smooth_mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
print(f"Found initial {len(contours)} contours")

# Filter and smooth contours
clean_contours = []
min_area = 100  # Ignore small noise dots

for c in contours:
    area = cv2.contourArea(c)
    if area < min_area:
        continue
    
    # Smooth the contour using Douglas-Peucker approximation
    # epsilon determines the closeness of fit (smaller = more detailed, larger = smoother)
    peri = cv2.arcLength(c, True)
    epsilon = 0.0015 * peri  # Dynamic tuning parameter
    approx = cv2.approxPolyDP(c, epsilon, True)
    
    if len(approx) >= 3:
        clean_contours.append(approx)

print(f"Filtered down to {len(clean_contours)} clean, smooth contours")

# Write SVG
h, w = smooth_mask.shape
svg_header = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">\n'
svg_footer = '</svg>'

svg_paths = []
for c in clean_contours:
    path_data = []
    pt = c[0][0]
    path_data.append(f"M {pt[0]} {pt[1]}")
    for p in c[1:]:
        pt = p[0]
        path_data.append(f"L {pt[0]} {pt[1]}")
    path_data.append("Z")
    
    path_str = " ".join(path_data)
    svg_paths.append(f'  <path d="{path_str}" fill="#4A0D15" stroke="none" fill-rule="evenodd" />\n')

with open("logo.svg", "w") as f:
    f.write(svg_header)
    f.write("".join(svg_paths))
    f.write(svg_footer)

print("Smoothed logo.svg created successfully.")
