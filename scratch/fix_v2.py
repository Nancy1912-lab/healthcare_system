import re
import difflib

with open("database/sample_data.sql", "r", encoding="utf-8") as f:
    sql = f.read()

# get all valid doctors
doc_lines = re.findall(r"\('?(Dr\. [^']+)'?, \d+", sql)
valid_doctors = list(set(doc_lines))

# get all valid patients
pat_lines = re.findall(r"\('([^']+)', \d+, '(?:Male|Female)'", sql)
valid_patients = list(set(pat_lines))

# Identify invalid references
doc_ref = re.findall(r"SELECT doctor_id FROM DOCTOR WHERE name='([^']+)'", sql)
pat_ref = re.findall(r"SELECT patient_id FROM PATIENT WHERE name='([^']+)'", sql)

missing_docs = []
for d in set(doc_ref):
    if d not in valid_doctors:
        missing_docs.append(d)

missing_pats = []
for p in set(pat_ref):
    if p not in valid_patients:
        missing_pats.append(p)

import random

print("Missing doc:", missing_docs)
print("Missing pat:", missing_pats)

for md in missing_docs:
    closest = difflib.get_close_matches(md, valid_doctors, n=1)
    if closest:
        replacement = closest[0]
    else:
        replacement = random.choice(valid_doctors)
    
    # replace specifically in DOCTOR WHERE clauses
    sql = re.sub(rf"SELECT doctor_id FROM DOCTOR WHERE name='{md}'", rf"SELECT doctor_id FROM DOCTOR WHERE name='{replacement}'", sql)
    print(f"Doc: Replaced '{md}' with '{replacement}'")

for mp in missing_pats:
    closest = difflib.get_close_matches(mp, valid_patients, n=1)
    if closest:
        replacement = closest[0]
    else:
        # map to some deterministic pseudorandom valid patient based on name hash to be consistent
        random.seed(hash(mp))
        replacement = random.choice(valid_patients)
    
    # replace specifically in PATIENT WHERE clauses
    sql = re.sub(rf"SELECT patient_id FROM PATIENT WHERE name='{mp}'", rf"SELECT patient_id FROM PATIENT WHERE name='{replacement}'", sql)
    print(f"Pat: Replaced '{mp}' with '{replacement}'")

with open("database/sample_data.sql", "w", encoding="utf-8") as f:
    f.write(sql)

print("Replacement complete.")
