from playwright.sync_api import sync_playwright
import sys

with sync_playwright() as p:
    try:
        b = p.chromium.launch(channel="msedge", headless=True)
    except Exception as e:
        print("msedge launch failed:", e); sys.exit(1)
    pg = b.new_page(viewport={"width":1280,"height":800}, device_scale_factor=2)
    pg.goto("http://localhost:8817/index.html", wait_until="networkidle", timeout=20000)
    pg.wait_for_timeout(1500)
    pg.screenshot(path="shots/smoke.png")
    print("OK title:", pg.title())
    b.close()
