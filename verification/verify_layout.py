import os
from playwright.sync_api import sync_playwright

def verify_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local index.html
        file_path = os.path.abspath("index.html")
        page.goto(f"file://{file_path}")

        # Wait for games to render (JS populates them)
        try:
            page.wait_for_selector(".game-card", timeout=5000)
        except:
            print("Timeout waiting for .game-card")

        # Wait a bit for images to load (or fail)
        page.wait_for_timeout(2000)

        # Take a full page screenshot
        screenshot_path = "verification/layout.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    verify_layout()
