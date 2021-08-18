import React, { useState, useEffect } from "react";
import Board from "./components/GameBoard";
import Header from "./components/Header";
import initializeDeck from "./deck";

export default function App() {
	const [cards, setCards] = useState([]);
	const [flipped, setFlipped] = useState([]);
	const [dimension, setDimension] = useState(400);
	const [solved, setSolved] = useState([]);
	const [disabled, setDisabled] = useState(false);
	const [score, setScore] = useState(0);
	const [user1, setUser1] = useState(0);
	const [user2, setUser2] = useState(0);
	const [activeUser, setActiveUser] = useState(1);
	const [wrongGuesses, setWrongGuesses] = useState(0);
	const [losses, setLosses] = useState(0);

	useEffect(() => {
		resizeBoard();
		setCards(initializeDeck());
	}, []);

	useEffect(() => {
		preloadImages();
	}, cards);

	useEffect(() => {
		checkScore();
	}, [score]);

	const handleClick = (id) => {
		setDisabled(true);
		if (flipped.length === 0) {
			setFlipped([id]);
			setDisabled(false);
		} else {
			if (sameCardClicked(id)) return;
			setFlipped([flipped[0], id]);
			if (isMatch(id)) {
				setSolved([...solved, flipped[0], id]);
				resetCards();
				updateScore(score, user1, user2, checkScore);
			} else {
				noMatch();
			}
		}
	};

	const noMatch = () => {
		updateGuesses(wrongGuesses, checkGuesses);
		setTimeout(resetCards, 2000);
	};

	function updateScore(user1, user2, callback) {
		setUser1(user1 + 1);
		setUser2(user2 + 1);
		callback(user1, user2);
	}

	function updateGuesses(wrongGuesses, callback) {
		var newGuesses = wrongGuesses + 1;
		setWrongGuesses(wrongGuesses + 1);
		callback(newGuesses);
	}

	const checkScore = (score) => {
		if (activeUser === 1) {
			setUser1(user1 + 1);
		} else {
			setUser2(user2 + 1);
		}
		setActiveUser(!activeUser);
	};

	const checkGuesses = (wrongGuesses) => {
		if (wrongGuesses > 15) {
			setLosses(losses + 1);
			setTimeout(newGame, 2000);
		}
	};

	const newGame = () => {
		setSolved([]);
		setCards(initializeDeck());
		setWrongGuesses(0);
		setScore(0);
	};

	const preloadImages = () =>
		cards.map((card) => {
			const src = `/img/${card.type}.png`;
			new Image().src = src;
		});

	const resetCards = () => {
		setFlipped([]);
		setDisabled(false);
	};

	const sameCardClicked = (id) => flipped.includes(id);

	const isMatch = (id) => {
		const clickedCard = cards.find((card) => card.id === id);
		const flippedCard = cards.find((card) => flipped[0] === card.id);
		return flippedCard.type === clickedCard.type;
	};

	const resizeBoard = () => {
		setDimension(
			Math.min(
				document.documentElement.clientWidth,
				document.documentElement.clientHeight
			)
		);
	};

	return (
		<div
			className="app"
			style={{
				textAlign: "center",
			}}
		>
			<Header
				losses={losses}
				user1={user1}
				user2={user2}
				activeUser={activeUser}
				score={score}
				wrongGuesses={wrongGuesses}
				newGame={newGame}
			/>
			<Board
				dimension={dimension}
				cards={cards}
				flipped={flipped}
				handleClick={handleClick}
				disabled={disabled}
				solved={solved}
			/>
		</div>
	);
}
