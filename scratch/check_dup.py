import re
from collections import Counter

with open("database/sample_data.sql", "r", encoding="utf-8") as f:
    sql = f.read()

# Grab all patient values tuples
# Example: ('PL Ramkumar', 43, 'Male', '9100002026', 'ramkumar@patient.com', ... )
pat_matches = re.findall(r"\('([^']+)', \d+, '(?:Male|Female)', '([^']+)', '([^']+)'", sql)

names = [m[0] for m in pat_matches]
phones = [m[1] for m in pat_matches]
emails = [m[2] for m in pat_matches]

print("Duplicate Names:", [k for k, v in Counter(names).items() if v > 1])
print("Duplicate Phones:", [k for k, v in Counter(phones).items() if v > 1])
print("Duplicate Emails:", [k for k, v in Counter(emails).items() if v > 1])

doc_matches = re.findall(r"\('?(Dr\. [^']+)'?, \d+, '([^']+)', '([^']+)'", sql)
d_names = [m[0] for m in doc_matches]
d_phones = [m[1] for m in doc_matches]
d_emails = [m[2] for m in doc_matches]

print("Doc Duplicate Names:", [k for k, v in Counter(d_names).items() if v > 1])
print("Doc Duplicate Phones:", [k for k, v in Counter(d_phones).items() if v > 1])
print("Doc Duplicate Emails:", [k for k, v in Counter(d_emails).items() if v > 1])
