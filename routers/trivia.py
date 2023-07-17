from fastapi import APIRouter
from typing import List
from pydantic import BaseModel
import random

router = APIRouter()

class TriviaOption(BaseModel):
    option: str
    is_correct: bool

class TriviaQuestion(BaseModel):
    question: str
    options: List[TriviaOption]
    answer: str

trivia_questions = [
    TriviaQuestion(
        question="What is the name of Han Solo's ship?",
        options=[
            TriviaOption(option="Enterprise", is_correct=False),
            TriviaOption(option="TIE Fighter", is_correct=False),
            TriviaOption(option="Millennium Falcon", is_correct=True),
            TriviaOption(option="X-Wing", is_correct=False)
        ],
        answer="Millennium Falcon"
    ),
    TriviaQuestion(
        question="Who trained Luke Skywalker to use the Force?",
        options=[
            TriviaOption(option="Obi-Wan Kenobi", is_correct=True),
            TriviaOption(option="Yoda", is_correct=False),
            TriviaOption(option="Darth Vader", is_correct=False),
            TriviaOption(option="Emperor Palpatine", is_correct=False)
        ],
        answer="Obi-Wan Kenobi"
    ),
    TriviaQuestion(
        question="What is the name of the desert planet that Luke Skywalker grew up on?",
        options=[
            TriviaOption(option="Tatooine", is_correct=True),
            TriviaOption(option="Naboo", is_correct=False),
            TriviaOption(option="Jakku", is_correct=False),
            TriviaOption(option="Coruscant", is_correct=False)
        ],
        answer="Tatooine"
    ),
    TriviaQuestion(
        question="What is the name of the bounty hunter who captures Han Solo in The Empire Strikes Back?",
        options=[
            TriviaOption(option="Boba Fett", is_correct=True),
            TriviaOption(option="Jango Fett", is_correct=False),
            TriviaOption(option="Cad Bane", is_correct=False),
            TriviaOption(option="Dengar", is_correct=False)
        ],
        answer="Boba Fett"
    ),
    TriviaQuestion(
        question="What is the name of the furry creatures who live on the forest moon of Endor?",
        options=[
            TriviaOption(option="Ewoks", is_correct=True),
            TriviaOption(option="Wookiees", is_correct=False),
            TriviaOption(option="Jawas", is_correct=False),
            TriviaOption(option="Togruta", is_correct=False)
        ],
        answer="Ewoks"
    ),
    TriviaQuestion(
        question="What is the name of the Sith Lord who is the main antagonist of the original Star Wars trilogy?",
        options=[
            TriviaOption(option="Darth Vader", is_correct=True),
            TriviaOption(option="Darth Maul", is_correct=False),
            TriviaOption(option="Count Dooku", is_correct=False),
            TriviaOption(option="Kylo Ren", is_correct=False)
        ],
        answer="Darth Vader"
    ),
    TriviaQuestion(
        question="What is the name of the planet that is destroyed by the Death Star in A New Hope?",
        options=[
            TriviaOption(option="Alderaan", is_correct=True),
            TriviaOption(option="Dagobah", is_correct=False),
            TriviaOption(option="Mustafar", is_correct=False),
            TriviaOption(option="Kashyyyk", is_correct=False)
        ],
        answer="Alderaan"
    ),
    TriviaQuestion(
        question="What is the name of the Jedi Master who trains Anakin Skywalker?",
        options=[
            TriviaOption(option="Qui-Gon Jinn", is_correct=True),
            TriviaOption(option="Mace Windu", is_correct=False),
            TriviaOption(option="Obi-Wan Kenobi", is_correct=False),
            TriviaOption(option="Kit Fisto", is_correct=False)
        ],
        answer="Qui-Gon Jinn"
    ),
    TriviaQuestion(
        question="What is the name of the bounty hunter who is hired to capture the Child in The Mandalorian?",
        options=[
            TriviaOption(option="IG-11", is_correct=True),
            TriviaOption(option="Boba Fett", is_correct=False),
            TriviaOption(option="Bossk", is_correct=False),
            TriviaOption(option="Zam Wesell", is_correct=False)
        ],
        answer="IG-11"
    ),
    TriviaQuestion(
        question="What is the name of the planet where the Rebel Alliance's base is located in The Empire Strikes Back?",
        options=[
            TriviaOption(option="Hoth", is_correct=True),
            TriviaOption(option="Dagobah", is_correct=False),
            TriviaOption(option="Endor", is_correct=False),
            TriviaOption(option="Kamino", is_correct=False)
        ],
        answer="Hoth"
    ),
    TriviaQuestion(
        question="What is the name of Luke Skywalker's sister?",
        options=[
            TriviaOption(option="Leia Organa", is_correct=True),
            TriviaOption(option="Rey Skywalker", is_correct=False),
            TriviaOption(option="Padmé Amidala", is_correct=False),
            TriviaOption(option="Ahsoka Tano", is_correct=False)
        ],
        answer="Leia Organa"
    ),
    TriviaQuestion(
        question="Who is the captain of the Millennium Falcon?",
        options=[
            TriviaOption(option="Han Solo", is_correct=True),
            TriviaOption(option="Luke Skywalker", is_correct=False),
            TriviaOption(option="Chewbacca", is_correct=False),
            TriviaOption(option="Lando Calrissian", is_correct=False)
        ],
        answer="Han Solo"
    ),
    TriviaQuestion(
        question="What is the name of the notorious gangster who controls Tatooine's underworld?",
        options=[
            TriviaOption(option="Jabba the Hutt", is_correct=True),
            TriviaOption(option="Darth Maul", is_correct=False),
            TriviaOption(option="Greedo", is_correct=False),
            TriviaOption(option="Bib Fortuna", is_correct=False)
        ],
        answer="Jabba the Hutt"
    ),
    TriviaQuestion(
        question="What is the color of Mace Windu's lightsaber?",
        options=[
            TriviaOption(option="Purple", is_correct=True),
            TriviaOption(option="Blue", is_correct=False),
            TriviaOption(option="Green", is_correct=False),
            TriviaOption(option="Red", is_correct=False)
        ],
        answer="Purple"
    ),
    TriviaQuestion(
        question="Who is the Supreme Leader of the First Order in the sequel trilogy?",
        options=[
            TriviaOption(option="Snoke", is_correct=True),
            TriviaOption(option="Kylo Ren", is_correct=False),
            TriviaOption(option="General Hux", is_correct=False),
            TriviaOption(option="Captain Phasma", is_correct=False)
        ],
        answer="Snoke"
    ),
    TriviaQuestion(
        question="What is the name of the gas giant planet where Cloud City is located?",
        options=[
            TriviaOption(option="Bespin", is_correct=True),
            TriviaOption(option="Naboo", is_correct=False),
            TriviaOption(option="Coruscant", is_correct=False),
            TriviaOption(option="Kamino", is_correct=False)
        ],
        answer="Bespin"
    ),
    TriviaQuestion(
        question="Who said the famous quote, 'Do or do not. There is no try.'?",
        options=[
            TriviaOption(option="Yoda", is_correct=True),
            TriviaOption(option="Obi-Wan Kenobi", is_correct=False),
            TriviaOption(option="Luke Skywalker", is_correct=False),
            TriviaOption(option="Darth Vader", is_correct=False)
        ],
        answer="Yoda"
    ),
    TriviaQuestion(
        question="What is the name of the Resistance pilot known as Poe Dameron's astromech droid?",
        options=[
            TriviaOption(option="BB-8", is_correct=True),
            TriviaOption(option="R2-D2", is_correct=False),
            TriviaOption(option="C-3PO", is_correct=False),
            TriviaOption(option="BB-9E", is_correct=False)
        ],
        answer="BB-8"
    ),
    TriviaQuestion(
        question="Who is the leader of the droid army in the prequel trilogy?",
        options=[
            TriviaOption(option="General Grievous", is_correct=True),
            TriviaOption(option="Darth Sidious", is_correct=False),
            TriviaOption(option="Count Dooku", is_correct=False),
            TriviaOption(option="Asajj Ventress", is_correct=False)
        ],
        answer="General Grievous"
    ),
    TriviaQuestion(
        question="What is the name of the character played by Harrison Ford in the Star Wars movies?",
        options=[
            TriviaOption(option="Han Solo", is_correct=True),
            TriviaOption(option="Luke Skywalker", is_correct=False),
            TriviaOption(option="Darth Vader", is_correct=False),
            TriviaOption(option="Obi-Wan Kenobi", is_correct=False)
        ],
        answer="Han Solo"
    )
]

@router.get("/trivia", response_model=TriviaQuestion, description="Returns a random Star Wars trivia question.")
def read_random_trivia_question():
    """Get a random Star Wars trivia question.

    This endpoint returns a random Star Wars trivia question.

    Returns:
        TriviaQuestion: A random Star Wars trivia question.

    """
    question = random.choice(trivia_questions)
    return question
