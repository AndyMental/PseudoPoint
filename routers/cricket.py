from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import random

class CricketScore(BaseModel):
    id: int
    team1: str
    team2: str
    score1: int
    score2: int

class CricketStat(BaseModel):
    id: int
    player: str
    team: str
    runs: int
    wickets: int
    catches: int

scores = []
stats = []

teams = ["India", "Australia", "England", "South Africa", "New Zealand", "Pakistan", "Sri Lanka", "Bangladesh", "Afghanistan", "Ireland"]

players=[
    ("Virat Kohli", "India"),
    ("Steve Smith", "Australia"),
    ("Joe Root", "England"),
    ("Kane Williamson", "New Zealand"),
    ("Babar Azam", "Pakistan"),
    ("Faf du Plessis", "South Africa"),
    ("Dimuth Karunaratne", "Sri Lanka"),
    ("Shakib Al Hasan", "Bangladesh"),
    ("Rashid Khan", "Afghanistan"),
    ("Paul Stirling", "Ireland"),
    ("Rohit Sharma", "India"),
    ("David Warner", "Australia"),
    ("Ben Stokes", "England"),
    ("Ross Taylor", "New Zealand"),
    ("Shadab Khan", "Pakistan"),
    ("Quinton de Kock", "South Africa"),
    ("Angelo Mathews", "Sri Lanka"),
    ("Tamim Iqbal", "Bangladesh"),
    ("Mohammad Nabi", "Afghanistan"),
    ("Kevin O'Brien", "Ireland"),
    ("Jasprit Bumrah", "India"),
    ("Pat Cummins", "Australia"),
    ("Jofra Archer", "England"),
    ("Trent Boult", "New Zealand"),
    ("Mohammad Amir", "Pakistan"),
    ("Kagiso Rabada", "South Africa"),
    ("Lasith Malinga", "Sri Lanka"),
    ("Mustafizur Rahman", "Bangladesh"),
    ("Rashid Khan", "Afghanistan"),
    ("Joshua Little", "Ireland"),
    ("Ravindra Jadeja", "India"),
    ("Mitchell Starc", "Australia"),
    ("Chris Woakes", "England"),
    ("Lockie Ferguson", "New Zealand"),
    ("Shaheen Afridi", "Pakistan"),
    ("Lungi Ngidi", "South Africa"),
    ("Nuwan Pradeep", "Sri Lanka"),
    ("Mehidy Hasan", "Bangladesh"),
    ("Mujeeb Ur Rahman", "Afghanistan"),
    ("Boyd Rankin", "Ireland"),
    ("Rishabh Pant", "India"),
    ("Alex Carey", "Australia"),
    ("Jos Buttler", "England"),
    ("Tom Latham", "New Zealand"),
    ("Sarfaraz Ahmed", "Pakistan"),
    ("Quinton de Kock", "South Africa"),
    ("Kusal Perera", "Sri Lanka"),
    ("Mushfiqur Rahim", "Bangladesh"),
    ("Mohammad Shahzad", "Afghanistan"),
    ("Gary Wilson", "Ireland"),
    ("Rohit Sharma", "India"),
    ("Shimron Hetmyer", "West Indies"),
    ("Rohit Sharma", "India"),
    ("Sam Billings", "England"),
    ("Jason Roy", "England"),
    ("Eoin Morgan", "England"),
    ("Shikhar Dhawan", "India"),
    ("Faf Du Plessis", "South Africa"),
    ("David Miller", "South Africa"),
    ("Ruturaj Gaikwad", "India"),
    ("Mayank Agarwal", "India"),
    ("Virat Kohli", "India"),
    ("Steve Smith", "Australia"),
    ("Kane Williamson", "New Zealand"),
    ("Martin Guptill", "New Zealand"),
    ("Chris Gayle", "West Indies"),
    ("Fakhar Zaman", "Pakistan"),
    ("Dean Elgar", "South Africa"),
    ("Dom Sibley", "England"),
    ("Manish Pandey", "India"),
    ("Shreyas Iyer", "India"),
    ("Hanuma Vihari", "India"),
    ("Suryakumar Yadav", "India"),
    ("Shubman Gill", "India"),
    ("Devdutt Paddikkal", "India"),
    ("Prithvi Shaw", "India"),
    ("Cheteshwar Pujara", "India"),
    ("Ajinkya Rahane", "India"),
    ("Rory Burns", "England"),
    ("Aaron Finch", "Australia"),
    ("David Warner", "Australia"),
    ("Evin Lewis", "West Indies"),
    ("Peter Handscomb", "Australia"),
    ("Joe Root", "England"),
    ("Babar Azam", "Pakistan"),
    ("Devon Conway", "New Zealand"),
    ("Haseeb Hameed", "England"),
    ("Dawid Malan", "England"),
    ("Aiden Markram", "South Africa"),
    ("Henry Nicholls", "New Zealand"),
    ("Darren Bravo", "West Indies"),
    ("Will Young", "New Zealand"),
    ("Mohd Naim Sheikh", "Bangladesh"),
    ("Rachin Ravindra", "New Zealand"),
    ("Hasratullah Shahidi", "Afghanistan"),
    ("Hazratullah Zazai", "Afghanistan"),
    ("Najibullah Zadran", "Afghanistan"),
    ("Usman Ghani", "Afghanistan"),
    ("Marcus Harris", "Australia"),
    ("Marnus Labuschagne", "Australia"),
    ("Usman Khawaja", "Australia"),
    ("Phil Salt", "England"),
    ("Mominul Haque", "Bangladesh"),
    ("Najmul Hossain Shanto", "Bangladesh"),
    ("Shadman Islam", "Bangladesh"),
    ("Zak Crawley", "England"),
    ("Ross Taylor", "New Zealand"),
    ("Azhar Ali", "Pakistan"),
    ("Abid Ali", "Pakistan"),
    ("Fawad Alam", "Pakistan"),
    ("Imam-ul-Haq", "Pakistan"),
    ("Khushdil Shah", "Pakistan"),
    ("Glenn Phillips", "New Zealand"),
    ("Tom Blundell", "New Zealand"),
    ("Mohammad Shahzad", "Afghanistan"),
    ("Travis Head", "Australia"),
    ("Liton Das", "Bangladesh"),
    ("Ollie Pope", "England"),
    ("Mohammad Rizwan", "Pakistan"),
    ("Soumya Sarkar", "Bangladesh"),
    ("Tamim Iqbal", "Bangladesh"),
    ("Mohammad Mithun", "Bangladesh"),
    ("Mark Chapman", "New Zealand"),
    ("Fin Allen", "New Zealand"),
    ("Jatinder Singh", "Oman"),
    ("Ayan Khan", "Oman"),
    ("Khawar Ali", "Oman"),
    ("Craig Williams", "Namibia"),
    ("Stephan Baard", "Namibia"),
    ("Bernard Scholtz", "Namibia"),
    ("Pikky Ya France", "Namibia"),
    ("Sunil Ambris", "West Indies"),
    ("Lendl Simmons", "West Indies"),
    ("Manan Vohra", "India"),
    ("Matt Renshaw", "Australia"),
    ("Tim David", "Singapore"),
    ("Sherfane Rutherford", "West Indies"),
    ("Charith Asalanka", "Sri Lanka"),
    ("Paul Stirling", "Ireland"),
    ("William Porterfield", "Ireland"),
    ("Sabbir Rahman", "Bangladesh"),
    ("Bhanuka Rajapaksa", "Sri Lanka"),
    ("Abdul Samad", "India"),
    ("Nic Maddinson", "Australia"),
    ("Ashen Bandara", "Sri Lanka"),
    ("Kyle Coetzer", "Scotland"),
    ("Iftikhar Ahmed", "Pakistan"),
    ("Jermaine Blackwood", "West Indies"),
    ("Jeet Raval", "New Zealand"),
    ("Saurabh Tiwary", "India"),
    ("Murali Vijay", "India"),
    ("Nitish Rana", "India"),
    ("Asad Shafiq", "Pakistan"),
    ("Joe Burns", "Australia"),
    ("Avishka Fernando", "Sri Lanka"),
    ("Oshada Fernando", "Sri Lanka"),
    ("Dimuth Karunaratne", "Sri Lanka"),
    ("Pathum Nissanka", "Sri Lanka"),
    ("Haider Ali", "Pakistan"),
    ("Haris Sohail", "Pakistan"),
    ("Asif Ali", "Pakistan"),
    ("Ahmed Shehzad", "Pakistan"),
    ("Kraigg Brathwaite", "West Indies"),
    ("Kedar Jadhav", "India"),
    ("Temba Bavuma", "South Africa"),
    ("Colin Ingram", "South Africa"),
    ("Shan Masood", "Pakistan"),
    ("Rahmat Shah", "Afghanistan"),
    ("Gary Ballance", "England"),
    ("Colin Munro", "New Zealand"),
    ("James Vince", "England"),
    ("Lahiru Thirimanne", "Sri Lanka"),
    ("Alex Hales", "England"),
    ("Liam Livingstone", "England"),
    ("Sohaib Maqsood", "Pakistan"),
    ("Ambati Rayudu", "India"),
    ("Shaun Marsh", "Australia"),
    ("Shoaib Malik", "Pakistan"),
    ("Chris Lynn", "Australia"),
    ("Mohammad Hafeez", "Pakistan"),
    ("David Miller", "South Africa"),
    ("George Munsey", "Scotland"),
    ("Haseeb Hameed", "England"),
    ("Pat Cummins", "Australia"),
    ("Adam Zampa", "Australia"),
    ("Hasan Ali", "Pakistan"),
    ("Shaheen Afridi", "Pakistan"),
    ("Wahab Riaz", "Pakistan"),
    ("Adil Rashid", "England"),
    ("Chris Woakes", "England"),
    ("Trent Boult", "New Zealand"),
    ("Lockie Ferguson", "New Zealand"),
    ("Tim Southee", "New Zealand"),
    ("Jofra Archer", "England"),
    ("Mark Wood", "England"),
    ("Bhuvneshwar Kumar", "India"),
    ("Chetan Sakariya", "India"),
    ("Kuldeep Yadav", "India"),
    ("Jasprit Bumrah", "India"),
    ("Yuzvendra Chahal", "India"),
    ("Mohammed Shami", "India"),
    ("Varun Chakravarthy", "India"),
    ("Nathan Coulter-Nile", "Australia"),
    ("Kagiso Rabada", "South Africa"),
    ("Lungi Ngidi", "South Africa"),
    ("Anrich Nortje", "South Africa"),
    ("Oshane Thomas", "West Indies"),
    ("Alzarri Joseph", "West Indies"),
    ("Ravichandaran Ashwin", "India"),
    ("Shahbaz Nadeem", "India"),
    ("Mohammed Siraj", "India"),
    ("Andrew Tye", "Australia"),
    ("Mitchell Starc", "Australia"),
    ("Jason Behrendorff", "Australia"),
    ("Kane Richardson", "Australia"),
    ("Axar Patel", "India"),
    ("Deepak Chahar", "India"),
    ("Piyush Chawla", "India"),
    ("Dushmantha Chameera", "Sri Lanka"),
    ("Liam Plunkett", "England"),
    ("Harshal Patel", "India"),
    ("Washington Sundar", "India"),
    ("Shannon Gabriel", "West Indies"),
    ("Sheldon Cottrell", "West Indies"),
    ("Haris Rauf", "Pakistan"),
    ("Hasan Ali", "Pakistan"),
    ("Yasir Shah", "Pakistan"),
    ("Mohammad Hasnain", "Pakistan"),
    ("Naveen-ul-Haq", "Afghanistan"),
    ("Hamid Hassan", "Afghanistan"),
    ("Rashid Khan", "Afghanistan"),
    ("Jan Frylinck", "Namibia"),
    ("Mujeeb Ur Rahman", "Afghanistan"),
    ("Gulbadin Naib", "Afghanistan"),
    ("Ruben Trumpelmann", "Namibia"),
    ("Mustafizur Rahman", "Bangladesh"),
    ("Mashrafe Mortaza", "Bangladesh"),
    ("Binura Fernando", "Sri Lanka"),
    ("Rubel Hossain", "Bangladesh"),
    ("Abu Jayed", "Bangladesh"),
    ("Isuru Udana", "Sri Lanka"),
    ("Kasun Rajitha", "Sri Lanka"),
    ("Lahiru Kumara", "Sri Lanka"),
    ("Suranga Lakmal", "Sri Lanka"),
    ("Nathan Lyon", "Australia"),
    ("Rahul Chahar", "India"),
    ("Ish Sodhi", "New Zealand"),
    ("Jayden Seales", "West Indies"),
    ("Reece Topley", "England"),
    ("Kaleemullah", "Oman"),
    ("Bilal Khan", "Oman"),
    ("Sufyan Mehmood", "Oman"),
    ("Tabraiz Shamsi", "South Africa"),
    ("Andile Phehlukwayo", "South Africa"),
    ("Imran Tahir", "South Africa"),
    ("Beuran Hendricks", "South Africa"),
    ("Ben Shikongo", "Namibia"),
    ("Craig Young", "Ireland"),
    ("Andy McBrine", "Ireland"),
    ("Peter Chase", "Ireland"),
    ("Peter Siddle", "Australia"),
    ("Hamza Tahir", "Scotland"),
    ("Safyaan Sharif", "Scotland"),
    ("Mark Watt", "Scotland"),
    ("Brad Wheal", "Scotland"),
    ("Alasdair Evans", "Scotland"),
    ("Gavin Main", "Scotland"),
    ("Jayant Yadav", "India"),
    ("Umesh Yadav", "India"),
    ("Will Somerville", "New Zealand"),
    ("Fred Klaassen", "Netherlands"),
    ("Shane Snater", "Netherlands"),
    ("Danny Briggs", "England"),
    ("Amit Mishra", "India"),
    ("Ben Laughlin", "Australia"),
    ("Ben Dwarshuis", "Australia"),
    ("Mohammad Abbas", "Pakistan"),
    ("Junaid Khan", "Pakistan"),
    ("James Anderson", "England"),
    ("Michael Neser", "Australia"),
    ("T Natarajan", "India"),
    ("Jack Leach", "England"),
    ("Blair Tickner", "New Zealand"),
    ("Sandeep Sharma", "India"),
    ("Khaleel Ahmed", "India"),
    ("Siddharth Kaul", "India"),
    ("Avesh Khan", "India"),
    ("Ravi Bishnoi", "India"),
    ("Arshdeep Singh", "India"),
    ("Murugan Ashwin", "India"),
    ("Shardul Thakur", "India"),
    ("Josh Hazlewood", "Australia"),
    ("Karn Sharma", "India"),
    ("James Pattinson", "Australia"),
    ("Dhawal Kulkarni", "India"),
    ("Marco Jansen", "South Africa"),
    ("Adam Milne", "New Zealand"),
    ("Arjun Tendulkar", "India"),
    ("Ashley Nurse", "West Indies"),
    ("Ollie Robinson", "England"),
    ("Chris Jordan", "England"),
    ("Ali Khan", "United States"),
    ("Scott Kuggeleijn", "New Zealand"),
    ("Lakshan Sandakan", "Sri Lanka"),
    ("Taskin Ahmed", "Bangladesh"),
    ("Taijul Islam", "Bangladesh"),
    ("Kesrick Williams", "West Indies"),
    ("Billy Stanlake", "Australia"),
    ("Naseem Shah", "Pakistan"),
    ("Jake Ball", "England"),
    ("Akila Dananjaya", "Sri Lanka"),
    ("Dom Bess", "England"),
    ("Ajaz Patel", "New Zealand"),
    ("Ravi Rampaul", "West Indies"),
    ("Tymal Mills", "England"),
    ("Blessing Muzarabani", "Zimbabwe"),
    ("Steven Finn", "England"),
    ("Simon Harmer", "South Africa"),
    ("Keshav Maharaj", "South Africa"),
    ("Jhye Richardson", "Australia"),
    ("Kemar Roach", "West Indies"),
    ("Varun Aaron", "India"),
    ("Mayank Markande", "India")
]

router = APIRouter()

@router.get("/scores/{match_id}", response_model=CricketScore, description="Returns cricket scores for the given match ID.")
def read_cricket_scores(match_id: int):
    """Get cricket scores by match ID.

    This endpoint retrieves cricket scores for the given match ID. It generates random scores for two teams.

    Args:
        match_id (int): The ID of the cricket match.

    Returns:
        CricketScore: The cricket score object containing the match details.

    """
    team1, team2 = random.sample(teams, 2)
    score1 = random.randint(100, 400)
    score2 = random.randint(100, 400)
    return CricketScore(id=match_id, team1=team1, team2=team2, score1=score1, score2=score2)

@router.get("/stats/{player_id}", response_model=CricketStat, description="Returns cricket statistics for the given player ID.")
def read_cricket_stats(player_id: int):
    """Get cricket statistics by player ID.

    This endpoint retrieves cricket statistics for the given player ID. It generates random statistics for a player.

    Args:
        player_id (int): The ID of the cricket player.

    Returns:
        CricketStat: The cricket statistics object containing the player details.

    """
    player, team = random.choice(players)
    runs = random.randint(500, 1500)
    wickets = random.randint(1, 20)
    catches = random.randint(1, 10)
    return CricketStat(id=player_id, player=player, team=team, runs=runs, wickets=wickets, catches=catches)

@router.get("/players/list", response_model=List[str], description="Returns a list of players for the given teams.")
def read_players_by_teams(teams: List[str]):
    """Get players by teams.

    This endpoint retrieves a list of players based on the provided teams.

    Args:
        teams (List[str]): The list of teams.

    Returns:
        List[str]: The list of players.

    """
    team_players = [player for player in players if player[1] in teams]
    return [player[0] for player in team_players]

@router.post("/scores", response_model=CricketScore, description="Create a new cricket score.")
def create_score(score: CricketScore):
    """Create a new cricket score.

    This endpoint creates a new cricket score.

    Args:
        score (CricketScore): The new cricket score.

    Returns:
        CricketScore: The created cricket score.
    """
    scores.append(score)
    return score


@router.put("/scores/{match_id}", response_model=CricketScore, description="Update an existing cricket score.")
def update_score(match_id: int, score: CricketScore):
    """Update an existing cricket score.

    This endpoint updates an existing cricket score based on the provided match_id.

    Args:
        match_id (int): The ID of the cricket match.
        score (CricketScore): The new cricket score.

    Returns:
        CricketScore: The updated cricket score.

    Raises:
        HTTPException: If the score is not found, a 404 error is raised.

    """
    for index, existing_score in enumerate(scores):
        if existing_score.id == match_id:
            scores[index] = score
            return score
    raise HTTPException(status_code=404, detail="Score not found")


@router.delete("/scores/{match_id}", response_model=None, description="Delete an existing cricket score.", status_code=204)
def delete_score(match_id: int):
    """Delete an existing cricket score.

    This endpoint deletes an existing cricket score based on the provided match_id.

    Args:
        match_id (int): The ID of the cricket match.

    Raises:
        HTTPException: If the score is not found, a 404 error is raised.

    """
    for index, existing_score in enumerate(scores):
        if existing_score.id == match_id:
            del scores[index]
            return
    raise HTTPException(status_code=404, detail="Score not found")


@router.post("/stats", response_model=CricketStat, description="Create a new cricket statistic.")
def create_stat(stat: CricketStat):
    """Create a new cricket statistic.

    This endpoint creates a new cricket statistic.

    Args:
        stat (CricketStat): The new cricket statistic.

    Returns:
        CricketStat: The created cricket statistic.
    """
    stats.append(stat)
    return stat


@router.put("/stats/{player_id}", response_model=CricketStat, description="Update an existing cricket statistic.")
def update_stat(player_id: int, stat: CricketStat):
    """Update an existing cricket statistic.

    This endpoint updates an existing cricket statistic based on the provided player_id.

    Args:
        player_id (int): The ID of the cricket player.
        stat (CricketStat): The new cricket statistic.

    Returns:
        CricketStat: The updated cricket statistic.

    Raises:
        HTTPException: If the statistic is not found, a 404 error is raised.

    """
    for index, existing_stat in enumerate(stats):
        if existing_stat.id == player_id:
            stats[index] = stat
            return stat
    raise HTTPException(status_code=404, detail="Stat not found")


@router.delete("/stats/{player_id}", response_model=None, description="Delete an existing cricket statistic.", status_code=204)
def delete_stat(player_id: int):
    """Delete an existing cricket statistic.

    This endpoint deletes an existing cricket statistic based on the provided player_id.

    Args:
        player_id (int): The ID of the cricket player.

    Raises:
        HTTPException: If the statistic is not found, a 404 error is raised.

    """
    for index, existing_stat in enumerate(stats):
        if existing_stat.id == player_id:
            del stats[index]
            return
    raise HTTPException(status_code=404, detail="Stat not found")