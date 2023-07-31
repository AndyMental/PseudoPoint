from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel, Field

router = APIRouter()

class Song(BaseModel):
    id: int
    title: str
    artist: str
    lyrics: str

songs = [
    Song(id=1, title="Bohemian Rhapsody", artist="Queen", lyrics="Is this the real life? Is this just fantasy?\nCaught in a landslide, no escape from reality."),
    Song(id=2, title="Stairway to Heaven", artist="Led Zeppelin", lyrics="There's a lady who's sure all that glitters is gold\nAnd she's buying a stairway to heaven."),
    Song(id=3, title="Imagine", artist="John Lennon", lyrics="Imagine there's no heaven, it's easy if you try\nNo hell below us, above us only sky."),
    # Add other songs here
]

@router.get("/", response_model=List[Song], description="Returns a list of all songs.")
def read_all_songs():
    """Get all songs.

    This endpoint returns a list of all songs.

    Returns:
        List[Song]: A list of all songs.

    """
    return songs

@router.get("/{song_id}", response_model=Song, description="Returns a song with the given ID.")
def read_song_by_id(song_id: int):
    """Get a song by ID.

    This endpoint returns a song based on the given ID.

    Args:
        song_id (int): The ID of the song.

    Returns:
        Song: The song with the given ID.

    Raises:
        HTTPException: If the song is not found.

    """
    song = next((song for song in songs if song.id == song_id), None)
    if song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    return song

@router.post("/", response_model=Song, description="Create a new song.")
def create_song(song: Song):
    """Create a new song.

    This endpoint allows the addition of a new song to the list of songs.

    Args:
        song (Song): The data of the new song in the format of the Song model.

    Returns:
        Song: The newly added song data.
    """
    song_id = max(s.id for s in songs) + 1
    new_song = Song(id=song_id, title=song.title, artist=song.artist, lyrics=song.lyrics)
    songs.append(new_song)
    return new_song

@router.put("/{song_id}", response_model=Song, description="Update an existing song.")
def update_song(song_id: int, song: Song):
    """Update an existing song.

    This endpoint updates an existing song with the given ID.

    Args:
        song_id (int): The ID of the song to be updated.
        song (Song): The data of the updated song in the format of the Song model.

    Returns:
        Song: The updated song.

    Raises:
        HTTPException: If the song is not found.

    """
    song_index = next((index for index, s in enumerate(songs) if s.id == song_id), None)
    if song_index is None:
        raise HTTPException(status_code=404, detail="Song not found")
    updated_song = Song(id=song_id, title=song.title, artist=song.artist, lyrics=song.lyrics)
    songs[song_index] = updated_song
    return updated_song

@router.delete("/{song_id}", response_model=Song, description="Delete a song.")
def delete_song(song_id: int):
    """Delete a song.

    This endpoint deletes a song with the given ID.

    Args:
        song_id (int): The ID of the song to be deleted.

    Returns:
        Song: The deleted song.

    Raises:
        HTTPException: If the song is not found.

    """
    song_index = next((index for index, s in enumerate(songs) if s.id == song_id), None)
    if song_index is None:
        raise HTTPException(status_code=404, detail="Song not found")
    deleted_song = songs.pop(song_index)
    return deleted_song
