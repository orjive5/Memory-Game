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

    const [lastClickedCard, setLastClickedCard] = useState([]);

    const [uniqueId, setUniqueId] = useState([])


    function clickCard(event) {
        setCards(shuffleArray([...data]));
        setClickedCards(prevClickedCards => {
            if (prevClickedCards.includes(event.target.id)) {
                return []
            } else {
                return [...prevClickedCards, event.target.id]
            }
        });
        setLastClickedCard(event.target);
        setUniqueId(prevUniqueId => {
            return [...prevUniqueId, event.target.id]
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
        setUniqueId([]);
    }


    function playAgainLost() {
        setClickedCards([]);
        setUniqueId([]);
    }

    function checkForDuplicates(array) {
        return new Set(array).size !== array.length
    }

    const gameFinished = () => {
        const findPainting = data.find(element => element.id === lastClickedCard.id);
        if (bestScore >= 16) {
            return (
                <div className="play-again won">
                    <div className="won-or-lost">
                        <h1>YOU WON!</h1>
                        <button onClick={playAgain} className='play-button'>PLAY AGAIN</button>
                    </div>
                    <div className="painting-and-title">
                        <img src={findPainting.src} alt='' className="card-painting-full" id={findPainting.id} />
                        <p>{findPainting.title}</p>
                    </div>
                </div>
            )
        }
        else if (checkForDuplicates(uniqueId)) {
            return (
                <div className="play-again lost">
                    <div className="won-or-lost">
                        <h1>YOU'VE LOST!</h1>
                        <button onClick={playAgainLost} className='play-button'>PLAY AGAIN</button>
                    </div>
                    <div className="painting-and-title">
                        <img src={findPainting.src} alt='' className="card-painting-full" id={findPainting.id} />
                        <p>{findPainting.title}</p>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="displayed-cards">
                    {displayCards}
                </div>
            )
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