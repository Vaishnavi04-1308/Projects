import mysql.connector
from mysql.connector import Error

# Database configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root1234",
    "database": "FIFA",
}

# Create database connection
def create_connection():
    conn = mysql.connector.connect(**db_config)
    return conn

def execute_query(conn, query, params=None):
    cursor = conn.cursor()
    cursor.execute(query, params or ())
    return cursor.fetchall() if cursor.with_rows else conn.commit()

def print_colored(text, color_code):
    END = '\033[0m'  # Resets color
    print(f'\033[{color_code}m{text}{END}')
   
def colored_input(prompt, color_code):
    END = '\033[0m'  # Resets color
    return input(f'\033[{color_code}m{prompt}{END}')


def main_menu(conn):
    choice = display_main_menu()
    while True:
        if choice == "a":
            #crud_operations_menu
            choice = display_table_list()
            while True:
                if choice == "1":
                    choice = Team()  
                elif choice == "2":
                    choice = Player()
                elif choice == "3":
                    choice = Matches()
                elif choice == "4":
                    choice = Venues()
                elif choice == "5":
                    choice = Goal()
                elif choice == "6":
                    choice = Fixture()
                elif choice == "7":
                    choice = PlayedBy()
                    break
                else:
                    print("Invalid, please choose again.")
                    choice = display_table_list()
                    break

def display_main_menu():
    print_colored("FIFA Womens World cup 23", 35)
    print_colored("a. To Modify the Data", 91)
    print_colored("b. Exit", 91)
    return colored_input("Enter your choice (a-b): ", 37)
    
def display_table_list():
    print_colored("\nTo Change the Data by Table", 35)
    print("1. Team Table")
    print("2. Player Table")
    print("3. Matches Table")
    print("4. Venues Table")
    print("5. Goal Table")
    print("6. Fixture Table")
    print("7. PlayedBy Table")
    return colored_input("Select a table to modify (1-7): ", 37)
    
def display_crud_operation_menu(tablename):
    print_colored("\n=== To Modify the Data ===", 34)
    print("1. Create " + tablename)
    print("2. Read " + tablename + " Data")
    print("3. Update " + tablename + " Data")
    print("4. Delete " + tablename )
    print("5. Return to Menu")
    return colored_input("Enter your choice (1-5): ", 36)

def Team():
    choice = display_crud_operation_menu("Team")
    while True:
        if choice == "1":
            # Add New Team
            team_id = input("Enter TeamID: ")
            team_name = input("Enter TeamName: ")
            country = input("Enter Country: ")
            coach = input("Enter Coach: ")
            fifa_ranking = input("Enter Fifa_Ranking: ")
            matches_played = input("Enter Matches_Played: ")

            query = """
                INSERT INTO Team (TeamID, TeamName, Country, Coach, Fifa_Ranking, Matches_Played) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            execute_query(conn, query, (team_id, team_name, country, coach, fifa_ranking, matches_played))
            print_colored("Team added successfully.", 91)

        elif choice == "2":
            # Read Team Data
            TeamName = input("Enter TeamName to search: ")
            query = "SELECT TeamID, TeamName, Country, Coach, Fifa_Ranking, Matches_Played FROM Team WHERE TeamName = %s"
            results = execute_query(conn, query, (TeamName,))
            print_colored("Team data read successfully.", 32)
            for row in results:
                print(row)

        elif choice == "3":
            TeamID, Teamname, Country, Coach, Fifa_Ranking, Matches_Played = input("Enter Team ID to update: "), input("Enter Teamname: "), input("Enter Country: "), input("Enter Coachname: "), input("Enter Fifa_Ranking: "), input("Enter Matches_Played: ")

            query = "UPDATE Team SET Teamname = %s, Country = %s, Coach = %s, Fifa_Ranking = %s, Matches_Played = %s WHERE TeamID = %s"
            execute_query(conn, query, (Teamname, Country, Coach, Fifa_Ranking, Matches_Played, TeamID))
            print_colored("Team updated successfully.", 32)

        elif choice == "4":
            TeamID = input("Enter Team ID to delete: ")
            query = "DELETE FROM Team WHERE TeamID = %s"
            execute_query(conn, query, (TeamID,))
            print_colored("User deleted successfully.", 32)

        elif choice == "5":
            return display_table_list()
        else:
            print("Invalid, try again.") 
            choice = display_crud_operation_menu("Team")

def Player():
    choice = display_crud_operation_menu("Player")
    while True:
        if choice == "1":
            player_id = input("Enter PlayerID: ")
            first_name = input("Enter FirstName: ")
            last_name = input("Enter LastName: ")
            team_id = input("Enter TeamID: ")
            position = input("Enter Position: ")
            jersey_number = input("Enter JerseyNumber: ")

            query = """
            INSERT INTO Player (PlayerID, FirstName, LastName, TeamID, Position, JerseyNumber)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
            execute_query(conn, query, (player_id, first_name, last_name, team_id, position, jersey_number))
            print_colored("Player added successfully.", 91)

        elif choice == "2":
            player_id = input("Enter Player ID to search: ")
            query = "SELECT PlayerID, FirstName, LastName, TeamID, Position, JerseyNumber FROM Player WHERE PlayerID = %s"
            results = execute_query(conn, query, (player_id,))
            print_colored("Player data read successfully.", 32)
            for row in results:
                print(row)
       
        elif choice == "3":
            PlayerID, FirstName, LastName, TeamID, Position, JerseyNumber  = input("Enter Player ID to update: "), input("Enter Firstname: "), input("Enter Lastname: "), input("Enter TeamID: "), input("Enter Position: "), input("Enter jersey number: ")
            query = "UPDATE Player SET FirstName = %s, LastName = %s, TeamID = %s, Position = %s, JerseyNumber = %s WHERE PlayerID = %s"
            execute_query(conn, query, (FirstName, LastName, TeamID, Position, JerseyNumber, PlayerID))
            print_colored("Player updated successfully.", 32)
        
        elif choice == "4":
            player_id = input("Enter Player ID to delete: ")
            query = "DELETE FROM Player WHERE PlayerID = %s"
            execute_query(conn, query, (player_id,))
            print_colored("Player deleted successfully.", 32)

        elif choice == "5":
            return display_table_list()
        else:
            print("Invalid, try again.")
            choice = display_crud_operation_menu("Player")

def Venues():
    choice = display_crud_operation_menu("Venues")
    while True:
        if choice == "1":
            venue_id = input("Enter VenueID: ")
            venue_name = input("Enter VenueName: ")
            city = input("Enter City: ")
            capacity = input("Enter Capacity: ")

            query = """
            INSERT INTO Venues(VenueID, VenueName, City, Capacity) 
            VALUES (%s, %s, %s, %s)
            """
            execute_query(conn, query, (venue_id, venue_name, city, capacity))
            print_colored("Venue added successfully.", 91)

        elif choice == "2":
            venue_id = input("Enter venue ID to search: ")
            query = "SELECT VenueID, VenueName, City, Capacity FROM Venues WHERE VenueID = %s"
            results = execute_query(conn, query, (venue_id,))
            print_colored("Venue data read successfully.", 32)
            for row in results:
                print(row)

        elif choice == "3":
            VenueID, VenueName, City, Capacity  = input("Enter venue ID to update: "), input("Enter VenueName: "), input("Enter City: "), input("Enter Capacity: ")
            query = "UPDATE Venues SET VenueName = %s, City = %s, Capacity = %s WHERE VenueID = %s"
            execute_query(conn, query, (VenueName, City, Capacity, VenueID))
            print_colored("venue updated successfully.", 32)

        elif choice == "4":
            venue_id = input("Enter Venue ID to delete: ")
            query = "DELETE FROM venues WHERE VenueID = %s"
            execute_query(conn, query, (venue_id,))
            print_colored("Venue deleted successfully.", 32)

        elif choice == "5":
            return display_table_list()
        else:
            print("Invalid, Try again.")
            choice = display_crud_operation_menu("Venues")

def Matches():
    choice = display_crud_operation_menu("Matches")
    while True:
        if choice == "1":
            match_id = input("Enter MatchID: ")
            match_date = input("Enter Match_Date (YYYY-MM-DD): ")
            location = input("Enter Location: ")
            team_id_1 = input("Enter TeamID_1: ")
            team_id_2 = input("Enter TeamID_2: ")
            result = input("Enter Result: ")
            venue_id = input("Enter VenueID: ")

            query = """
            INSERT INTO Matches( MatchID, Match_Date, Location, TeamID_1, TeamID_2, Result, VenueID )
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            execute_query(conn, query, (match_id, match_date, location, team_id_1, team_id_2, result, venue_id))
            print_colored("Match added successfully.", 91)
 
        elif choice == "2":
            match_id = input("Enter match ID to search: ")
            query = "SELECT * FROM Matches WHERE MatchID = %s"
            results = execute_query(conn, query, (match_id,))
            print_colored("Match data read successfully.", 32)
            for row in results:
                print(row)

        elif choice == "3":
            MatchID, Match_Date, Location, TeamID_1, TeamID_2, Result, VenueID = input("Enter Match ID to update: "), input("Enter MatchDate: "), input("Location: "), input("TeamID_1: "), input("TeamID_2: "), input("Result: "), input("VenueID: ")
            query = "UPDATE Matches SET Match_Date = %s, Location = %s, TeamID_1 = %s, TeamID_2 = %s, Result = %s, VenueID = %s WHERE MatchID = %s"
            execute_query(conn, query, (Match_Date, Location, TeamID_1, TeamID_2, Result, VenueID, MatchID))
            print_colored("Match updated successfully.", 32)

        elif choice == "4":
            match_id = input("Enter Match ID to delete: ")
            query = "DELETE FROM Matches WHERE MatchID = %s"
            execute_query(conn, query, (match_id,))
            print_colored("Match deleted successfully.", 32)

        elif choice == "5":
            return display_table_list()
        else:
            print("Invalid choice, please choose again.")
            choice = display_crud_operation_menu("User_Roles")

def Goal():
    choice = display_crud_operation_menu("Goal")
    while True:
        if choice == "1":
            goal_id = input("Enter GoalID: ")
            match_id = input("Enter MatchID: ")
            player_id = input("Enter PlayerID: ")
            scored_for_team_id = input("Enter ScoredforTeamID: ")

            query = """
            INSERT INTO Goal (GoalID, MatchID, PlayerID, ScoredforTeamID)
            VALUES (%s, %s, %s, %s)
            """
            execute_query(conn, query, (goal_id, match_id, player_id, scored_for_team_id))
            print_colored("Goal added successfully.", 91)

        elif choice == "2":
            goal_id = input("Enter goal ID to search: ")
            query = "SELECT * FROM Goal WHERE GoalID = %s"
            results = execute_query(conn, query, (goal_id,))
            print_colored("Goal data read successfully.", 32)
            for row in results:
                print(row)

        elif choice == "3":
            GoalID, MatchID, PlayerID, ScoredforTeamID = input("Enter Goal ID to update: "), input("Enter MatchID: "), input("PlayerID: "), input("ScoredforTeamID: ")
            query = "UPDATE Goal SET MatchID = %s, PlayerID = %s, ScoredforTeamID = %s WHERE GoalID = %s"
            execute_query(conn, query, (MatchID, PlayerID, ScoredforTeamID, GoalID))
            print_colored(" Goal updated successfully.", 32)

        elif choice == "4":
            goal_id = input("Enter Goal ID to delete: ")
            query = "DELETE FROM Goal WHERE GoalID = %s"
            execute_query(conn, query, (goal_id,))
            print_colored("Goal deleted successfully.", 32)

        elif choice == "5":
            return display_table_list()
        else:
            print("Invalid choice, please choose again.") 
            choice = display_crud_operation_menu("Author")

def Fixture():
    choice = display_crud_operation_menu("Fixture")
    while True:
        if choice == "1":
            fixture_id = input("Enter FixtureID: ")
            match_id = input("Enter MatchID: ")
            stage = input("Enter Stage: ")
            location = input("Enter Location: ")

            query = """
            INSERT INTO Fixture (FixtureID, MatchID, Stage, Location)
            VALUES (%s, %s, %s, %s)
            """
            execute_query(conn, query, (fixture_id, match_id, stage, location))
            print_colored("Fixture added successfully.", 91)

        elif choice == "2":
            fixture_id = input("Enter Fixture ID to search: ")
            query = "SELECT * FROM Fixture WHERE FixtureID = %s"
            results = execute_query(conn, query, (fixture_id,))
            print_colored("Fixture data read successfully.", 32)
            for row in results:
                print(row)

        elif choice == "3":
            FixtureID, MatchID, Stage, Location = input("Enter Fixture ID to update: "), input("Enter MatchID: "), input("Stage: "), input("Location: ")
            query = "UPDATE Fixture SET MatchID = %s, Stage = %s, Location = %s WHERE FixtureID = %s"
            execute_query(conn, query, (MatchID, Stage, Location, FixtureID))
            print_colored(" Fixture updated successfully.", 32)

        elif choice == "4":
            fixture_id = input("Enter fixture ID to delete: ")
            query = "DELETE FROM Fixture WHERE FixtureID = %s"
            execute_query(conn, query, (fixture_id,))
            print_colored("Fixture deleted successfully.", 32)

        elif choice == "5":
            return display_table_list()
        else:
            print("Invalid choice, please choose again.")
            choice = display_crud_operation_menu("Content_Tag")

def PlayedBy():
    choice = display_crud_operation_menu("PlayedBy")
    while True:
        if choice == "1":
            team_id_1 = input("Enter TeamID_1: ")
            team_id_2 = input("Enter TeamID_2: ")
            match_id = input("Enter MatchID: ")
            match_date = input("Enter Match_Date (YYYY-MM-DD): ")

            query = """
            INSERT INTO PlayedBy (TeamID_1, TeamID_2, MatchID, Match_Date)
            VALUES (%s, %s, %s, %s)
            """
            execute_query(conn, query, (team_id_1, team_id_2, match_id, match_date))
            print_colored("Playedby added successfully.", 91)

        elif choice == "2":
            Match_id = input("Enter Match ID to search: ")
            query = "SELECT * FROM PlayedBy WHERE MatchID = %s"
            results = execute_query(conn, query, (Match_id,))
            print_colored("Playedby data read successfully.", 32)
            for row in results:
                print(row)
            
        elif choice == "3":
            TeamID_1, TeamID_2, MatchID, Match_Date = input("Enter Team ID1 to update: "), input("Enter TeamID_2: "), input("MatchID: "), input("Match_Date: ")
            query = "UPDATE PlayedBy SET TeamID_1 = %s, TeamID_2 = %s, Match_Date = %s WHERE MatchID = %s"
            execute_query(conn, query, (TeamID_1, TeamID_2, MatchID, Match_Date))
            print_colored(" PlayedBy updated successfully.", 32)

        elif choice == "4":
            match_id = input("Enter match ID to delete: ")
            query = "DELETE FROM PlayedBy WHERE MatchID = %s"
            execute_query(conn, query, (match_id,))
            print_colored("Match deleted successfully.", 32)

        elif choice == "5":
            return display_table_list()
        else:
            print("Invalid choice, please choose again.")
            choice = display_crud_operation_menu("Content_Category")

if __name__ == "__main__":
    conn = create_connection()
    if conn:
        main_menu(conn)
        conn.close()
    else:
        print("Unable to connect to the database.")