import mysql.connector

def connection(database_name):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root1234",  # Ensure to add the actual password if there's one
        db=database_name,  # Use the function parameter
    )
    return conn
# Correctly pass the database name as a string
conn = connection('FIFA')  
cursor = conn.cursor()
cursor.execute("SELECT * FROM Team")
rows = cursor.fetchall()
for row in rows:
    print(row)
cursor.close()
conn.close()

