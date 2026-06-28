from app.database.db import get_db


def init_database():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS incidents(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT,
        people_affected INTEGER,
        injuries INTEGER,
        needs TEXT,
        priority TEXT
    )
    """)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    init_database()