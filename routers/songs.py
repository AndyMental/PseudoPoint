from fastapi import APIRouter, HTTPException
from typing import List, Optional

router = APIRouter()

class Song:
    def __init__(self, title: str, artist: str, lyrics: str):
        self.title = title
        self.artist = artist
        self.lyrics = lyrics

songs = [
    Song("Bohemian Rhapsody", "Queen", "Is this the real life? Is this just fantasy?\nCaught in a landslide, no escape from reality."),
    Song("Stairway to Heaven", "Led Zeppelin", "There's a lady who's sure all that glitters is gold\nAnd she's buying a stairway to heaven."),
    Song("Imagine", "John Lennon", "Imagine there's no heaven, it's easy if you try\nNo hell below us, above us only sky."),
    Song("Like a Rolling Stone", "Bob Dylan", "Once upon a time you dressed so fine\nYou threw the bums a dime in your prime, didn't you?"),
    Song("Smells Like Teen Spirit", "Nirvana", "Load up on guns, bring your friends\nIt's fun to lose and to pretend."),
    Song("Billie Jean", "Michael Jackson", "She was more like a beauty queen from a movie scene\nI said don't mind, but what do you mean, I am the one."),
    Song("Hey Jude", "The Beatles", "Hey Jude, don't make it bad\nTake a sad song and make it better."),
    Song("I Will Always Love You", "Whitney Houston", "If I should stay, I would only be in your way\nSo I'll go, but I know I'll think of you every step of the way."),
    Song("Thriller", "Michael Jackson", "It's close to midnight and something evil's lurking in the dark\nUnder the moonlight you see a sight that almost stops your heart."),
    Song("Hotel California", "Eagles", "On a dark desert highway, cool wind in my hair\nWarm smell of colitas, rising up through the air.")
]

@router.get("/{title}", response_model=Song, description="Returns a song with the given title.")
def read_song_by_title(title: Optional[str] = None):
    """Get a song by title.

    This endpoint returns a song based on the given title.

    Args:
        title (str, optional): The title of the song. If not provided, returns all songs.

    Returns:
        Song: The song with the given title.

    Raises:
        HTTPException: If the song is not found.

    """
    if title is None:
        raise HTTPException(status_code=400, detail="Title parameter is required")
    
    song = next((song for song in songs if song.title == title), None)
    if song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    return song

@router.get("/", response_model=List[Song], description="Returns a list of all songs.")
def read_all_songs():
    """Get all songs.

    This endpoint returns a list of all songs.

    Returns:
        List[Song]: A list of all songs.

    """
    return songs
