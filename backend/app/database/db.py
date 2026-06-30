import sqlite3
import os

DATABASE = "database/rescuesync.db"


def get_db():
    # Ensure database folder exists
    os.makedirs(os.path.dirname(DATABASE), exist_ok=True)

    conn = sqlite3.connect(DATABASE, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn