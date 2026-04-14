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
doc_ref = re.findall(r"WHERE name='(Dr\. [^']+)'", sql)
pat_ref = re.findall(r"WHERE name='([^']+)'", sql) # captures both, we'll filter

missing_docs = []
for d in set(doc_ref):
    if d not in valid_doctors:
        missing_docs.append(d)

missing_pats = []
for p in set(pat_ref):
    if not p.startswith("Dr.") and p not in valid_patients:
        missing_pats.append(p)

print("Missing pat:", missing_pats)

import random
random.seed(42)

for md in missing_docs:
    # try find closest
    closest = difflib.get_close_matches(md, valid_doctors, n=1)
    if closest:
        replacement = closest[0]
    else:
        replacement = random.choice(valid_doctors)
    sql = re.sub(rf"WHERE name='{md}'", f"WHERE name='{replacement}'", sql)
    print(f"Doc: Replaced {md} with {replacement}")

for mp in missing_pats:
    closest = difflib.get_close_matches(mp, valid_patients, n=1)
    if closest:
        replacement = closest[0]
    else:
        replacement = random.choice(valid_patients)
    sql = re.sub(rf"WHERE name='{mp}'", f"WHERE name='{replacement}'", sql)
    print(f"Pat: Replaced {mp} with {replacement}")

with open("database/sample_data.sql", "w", encoding="utf-8") as f:
    f.write(sql)

print("Replacement complete.")
