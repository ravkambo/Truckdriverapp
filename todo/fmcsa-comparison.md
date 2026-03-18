# FMCSA PDF vs Current Application — Gap Analysis
**Source:** FMCSA Driver Employment Application (Drivers_Employment_Application_508.pdf)
**Regulation:** 49 CFR 391.21
**Date Reviewed:** 2026-03-17

---

## MISSING FROM OUR APP (Required by FMCSA / 49 CFR 391.21)

### 1. Date of Application
- **FMCSA:** Collected in Applicant Information section
- **Ours:** Not collected anywhere
- **Fix:** Add to Step 1 or Step 2 (auto-fill with current date, read-only)

### 2. Date Available for Work
- **FMCSA:** Collected in Applicant Information section
- **Ours:** Not collected anywhere
- **Fix:** Add to Step 2 (General Information)

### 3. Mailing Address (separate from Current Address)
- **FMCSA:** Collects Current, Mailing, and up to 3 Previous addresses
- **Ours:** Collects Current + Previous only — no separate Mailing address field
- **Fix:** Add a Mailing Address row to Step 1 address section (with "same as current" checkbox)

### 4. Driving Experience — Date From, Date To, Approx Miles
- **FMCSA:** For each equipment type: Date From, Date To, Approx # of Miles (Total)
- **Ours:** Only captures Yes/No and Years of experience (1–5+) — no dates, no miles
- **Fix:** Replace the current years dropdown with Date From, Date To, and Miles fields per equipment type

### 5. Accident Record — # Fatalities and # Injuries
- **FMCSA:** Requires # Fatalities and # Injuries per accident
- **Ours:** Missing both fields in the accident records section (Step 7)
- **Fix:** Add # Fatalities and # Injuries number fields to each accident record

### 6. Per-Employer FMCSR Compliance Questions (2 questions, required by DOT)
- **FMCSA:** For EACH employer listed, asks:
  1. "Were you subject to the Federal Motor Carrier Safety Regulations?"
  2. "Was the job designated as a safety-sensitive function in any DOT-regulated mode subject to alcohol and controlled substances testing as required by 49 CFR, part 40?"
- **Ours:** Only asks "Did you operate a commercial motor vehicle?" — similar but NOT the same as the two required DOT questions
- **Fix:** Add both required questions to each employer block in Step 5

### 7. Salary Field in Employment History
- **FMCSA:** Collects salary for each employer
- **Ours:** Missing salary field per employer
- **Fix:** Add Salary field to each employer record in Step 5

### 8. Employment Gaps Explanation per Employer
- **FMCSA:** Has "Explain any gaps in employment" field within each employer block
- **Ours:** Handles unemployment periods as a separate section in Step 6 — not tied to individual employers
- **Fix:** Consider adding a gaps explanation field per employer block, or keep separate but ensure it's clearly linked

### 9. Other Qualifications Section
- **FMCSA:** Page 3 has a free-text "Other Qualifications" section — "Please list any other qualifications that you have and which you believe should be considered."
- **Ours:** No equivalent field
- **Fix:** Add an "Other Qualifications" textarea, likely in Step 6 (Training & Education) or as its own sub-section

### 10. CDL Single-License Certification Statement
- **FMCSA:** License section includes the full regulatory statement: "No person who operates a commercial motor vehicle shall at any time have more than one driver's license (49 CFR 383.21). I certify that I do not have more than one motor vehicle license..."
- **Ours:** Has CDL checkbox but not this specific certification language
- **Fix:** Add this regulatory statement above the license entry section in Step 4

### 11. Traffic Violations — "Other Than Parking Violations" Clarification
- **FMCSA:** Section heading explicitly says "other than parking violations"
- **Ours:** No such clarification in Step 7
- **Fix:** Add the parenthetical "(other than parking violations)" to the traffic violations question/section heading

### 12. License Denial vs. Suspension — Two Separate Questions
- **FMCSA:** Asks two distinct questions:
  1. "Have you ever been denied a license, permit, or privilege to operate a motor vehicle?"
  2. "Has any license, permit, or privilege ever been suspended or revoked?"
- **Ours:** Combines both into one question: "Has any license, permit or privilege ever been denied, suspended or revoked for any reason?"
- **Fix:** Split into two separate Yes/No questions in Step 7 to match FMCSA exactly

---

## DIFFERENCES (Not necessarily missing — our app goes further)

| Topic | FMCSA Says | Our App |
|---|---|---|
| Accident lookback period | Past 3 years | Past 5 years (more conservative — acceptable) |
| Driving experience types | 5 types | 12 types (more detailed — good) |
| Employment history | 3 named employer blocks | Dynamic add/remove, up to 10 years (good) |
| Education | High School / College / Other | Driver training school + other education (similar) |
| Signature | Wet/printed signature + date + printed name | Typed e-signature + date (legally valid but different format) |

---

## THINGS IN OUR APP NOT IN THE FMCSA FORM (Legal additions — keep)

These are not required by 49 CFR 391.21 but are reasonable carrier additions:
- TWIC Card question
- Military service section
- Preferred contact method / best time to contact
- Privacy Policy acknowledgment
- Driver referral question
- FCRA Summary of Rights disclosure
- PSP Authorization
- Consumer Reports Disclosure
- Safety Performance History Authorization (49 CFR 391.23)
- "May we contact this employer" per employer
- "Were you terminated/discharged/laid off" per employer
- Document upload (Step 9)
- Cross-border, Hazmat, Reefer, Lumber, Bonded Load experience types

---

## PRIORITY FIXES

| Priority | Item | Step Affected |
|---|---|---|
| HIGH | Per-employer DOT FMCSR questions (2 per employer) | Step 5 |
| HIGH | Date Available for Work | Step 2 |
| HIGH | Accident # Fatalities and # Injuries fields | Step 7 |
| HIGH | Split license denial vs. suspension into 2 questions | Step 7 |
| MEDIUM | Date of Application (auto-filled) | Step 1 or 2 |
| MEDIUM | Mailing Address field | Step 1 |
| MEDIUM | Driving Experience — Date From/To and Miles | Step 3 |
| MEDIUM | Other Qualifications free-text section | Step 6 |
| MEDIUM | CDL single-license certification statement | Step 4 |
| LOW | Salary field per employer | Step 5 |
| LOW | Traffic violations "other than parking violations" note | Step 7 |
