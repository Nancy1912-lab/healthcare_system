import re

with open("database/sample_data.sql", "r", encoding="utf-8") as f:
    sql = f.read()

# We want to replace each instance of (SELECT patient_id FROM PATIENT WHERE name='xyz' LIMIT 1)
# with (SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 0), then OFFSET 1, etc.

counter = 0
def replacer(match):
    global counter
    replacement = f"(SELECT patient_id FROM PATIENT LIMIT 1 OFFSET {counter})"
    counter += 1
    return replacement

new_sql = re.sub(r"\(SELECT patient_id FROM PATIENT WHERE name='[^']+' LIMIT 1\)", replacer, sql)

with open("database/sample_data.sql", "w", encoding="utf-8") as f:
    f.write(new_sql)

print(f"Replaced {counter} patient references with guaranteed unique offsets.")
