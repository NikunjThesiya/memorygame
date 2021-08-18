import React from "react";
import "./Header.css";

const Header = ({
	losses,
	user1,
	user2,
	activeUser,
	wrongGuesses,
	score,
	newGame,
}) => (
	<div className="headerItems">
		<div className="title">
			<div>CARD MEMORY GAME</div>
		</div>

		<div className="scoreBoard">
			<div className="score">User 1 Score: {user1}/8</div>
			<div className="score">User 2 Score: {user2}/8</div>
		</div>

		<div className="btn">
			<div className="" onClick={() => newGame()}>
				Restart Game
			</div>
		</div>
	</div>
);

export default Header;
