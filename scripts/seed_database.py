import sqlite3

DB_PATH = "database/rescuesync.db"

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

print("🌱 Seeding database with sample data...")

cur.execute("""
INSERT INTO incidents (
    location,
    people_affected,
    injuries,
    needs,
    priority
) VALUES (
    'Vijayawada Bus Stand',
    5,
    1,
    'food, water',
    'Medium'
)
""")

cur.execute("""
INSERT INTO incidents (
    location,
    people_affected,
    injuries,
    needs,
    priority
) VALUES (
    'Krishna River',
    10,
    0,
    'shelter, blankets',
    'High'
)
""")

conn.commit()
conn.close()

print("✅ Database seeded successfully.")