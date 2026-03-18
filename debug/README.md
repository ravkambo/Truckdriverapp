# Debug Driver Profiles

5 realistic driver profiles for manually testing the app end-to-end.

## Profiles at a Glance

| File | Driver | Profile Summary |
|---|---|---|
| `driver1_james_hartwell.json` | James Hartwell | 12-yr veteran, hazmat/doubles endorsements, clean record (1 minor speeding ticket), TWIC card |
| `driver2_maria_santos.json` | Maria Santos | Owner-operator, 7 yrs exp, 1 at-fault accident + 2 minor violations, recently self-employed |
| `driver3_derek_oconnell.json` | Derek O'Connell Jr. | 4-yr CDL, Army vet, clean commercial record, relocation gap in employment |
| `driver4_patricia_nguyen.json` | Patricia Nguyen | 15-yr elite driver, Air Force vet, doubles/hazmat/tanker/passenger endorsements, 500k mi no incident award, perfect record |
| `driver5_tyrone_bassett.json` | Tyrone Bassett | 9 yrs exp, reckless driving conviction, positive drug test (2023), terminated by last employer – SAP program completed |

## Submitting to the API

Make sure the backend is running, then:

```bash
# Start the backend (from project root)
cd backend
uvicorn main:app --reload

# In another terminal, submit all profiles
python debug/submit_profiles.py
```

Each profile will print its assigned `id` and `status` on success.

## Manual Testing

You can also submit individual profiles with curl:

```bash
curl -X POST http://localhost:8000/submit-application \
  -H "Content-Type: application/json" \
  -d @debug/driver1_james_hartwell.json
```

## Reset Between Test Runs

```bash
curl -X POST http://localhost:8000/reset-database
```
