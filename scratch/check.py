import re

with open("database/sample_data.sql", "r", encoding="utf-8") as f:
    sql = f.read()

# doctors inserted
doc_lines = re.findall(r"\('?(Dr\. [^']+)'?, \d+", sql)
doc_names = set(doc_lines)

# patients inserted
pat_lines = re.findall(r"\('([^']+)', \d+, '(?:Male|Female)'", sql)
pat_names = set(pat_lines)

print("Number of inserted doc names:", len(doc_names))
print("Number of inserted pat names:", len(pat_names))

doc_ref = re.findall(r"SELECT doctor_id FROM DOCTOR WHERE name='([^']+)'", sql)
pat_ref = re.findall(r"SELECT patient_id FROM PATIENT WHERE name='([^']+)'", sql)

print("\nDoctors referenced but not found:")
for d in set(doc_ref):
    if d not in doc_names:
        print(d)

print("\nPatients referenced but not found:")
for p in set(pat_ref):
    if p not in pat_names:
        print(p)
