import os
from playwright.sync_api import sync_playwright

def verify_refactor():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to index.html
        cwd = os.getcwd()
        file_path = os.path.join(cwd, 'index.html')
        url = f'file://{file_path}'

        print(f"Navigating to {url}")
        page.goto(url)

        # Verify title
        title = page.title()
        print(f"Page title: {title}")
        assert "DiRez Store" in title

        # Verify CSS loaded (check background color of body)
        # The body background is a gradient, so checking might be complex,
        # but let's check if .header exists and has styles.
        header = page.locator('.header')
        assert header.is_visible()

        # Verify JS loaded (games should be rendered)
        # The game cards are added by JS.
        # Wait for game-card to appear
        try:
            page.wait_for_selector('.game-card', timeout=5000)
            print("Game cards rendered successfully.")
        except Exception as e:
            print("Game cards NOT rendered. JS might be broken.")
            raise e

        # Take screenshot
        screenshot_path = os.path.join(cwd, 'verification/refactor_screenshot.png')
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_refactor()
