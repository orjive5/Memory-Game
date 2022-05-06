import React, { useEffect, useState } from "react";
import Card from "./Card";
import data from "./data";

function Main() {

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const [cards, setCards] = useState(shuffleArray(data));

    const [clickedCards, setClickedCards] = useState([]);

    let currentScore = clickedCards.length;

    const [bestScore, setBestScore] = useState(currentScore);


    function clickCard(event) {
        setCards(shuffleArray([...data]));
        setClickedCards(prevClickedCards => {
            if (prevClickedCards.includes(event.target.id)) {
                return []
            } else {
                return [...prevClickedCards, event.target.id]
            }
        })
    }

    useEffect(() => {
        setBestScore(prevBestScore => {
            if (prevBestScore >= clickedCards.length) {
                return prevBestScore
            } else {
                return clickedCards.length
            }
        })
    }, [clickedCards])

    const displayCards = cards.map(element => {
        return <Card
            key={element.id}
            id={element.id}
            title={element.title}
            src={element.src}
            handleClick={clickCard}
        />
    })

    function playAgain() {
        setBestScore(0);
        setClickedCards([]);
    }

    const gameFinished = () => {
        //TODO: Add logic for when the game is lost
        if (bestScore >= 16) {
            return (
                <div className="play-again"><h1>YOU WON!</h1><button onClick={playAgain}>PLAY AGAIN</button></div>
            )
        } else {
            return <div className="displayed-cards">{displayCards}</div>
        }
    }

    return (
        <main>
            <div className="score-keeper">
                <h1>Current score: {currentScore}</h1>
                <h1>Best score: {bestScore}</h1>
            </div>
            {gameFinished()}
        </main>
    )
}

export default Main;