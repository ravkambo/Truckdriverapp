"""
Debug script to submit all 5 driver profiles to the local API.

Usage:
    python debug/submit_profiles.py

Make sure the backend is running first:
    cd backend && uvicorn main:app --reload
"""

import json
import os
import sys
import urllib.request
import urllib.error

BASE_URL = "http://localhost:8000"
DEBUG_DIR = os.path.dirname(os.path.abspath(__file__))

PROFILES = [
    "driver1_james_hartwell.json",
    "driver2_maria_santos.json",
    "driver3_derek_oconnell.json",
    "driver4_patricia_nguyen.json",
    "driver5_tyrone_bassett.json",
]


def submit_profile(filename: str) -> None:
    path = os.path.join(DEBUG_DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        payload = json.load(f)

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{BASE_URL}/submit-application",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            name = f"{result.get('first_name', '')} {result.get('last_name', '')}"
            print(f"  [OK] {filename}  →  id={result.get('id')}  name={name}  status={result.get('status')}")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        print(f"  [FAIL] {filename}  →  HTTP {e.code}: {body}")
    except urllib.error.URLError as e:
        print(f"  [ERROR] {filename}  →  {e.reason}")
        print("         Is the backend running at", BASE_URL, "?")
        sys.exit(1)


def main():
    print(f"Submitting {len(PROFILES)} debug driver profiles to {BASE_URL}...\n")
    for profile in PROFILES:
        submit_profile(profile)
    print("\nDone. View results at GET /applications")


if __name__ == "__main__":
    main()
