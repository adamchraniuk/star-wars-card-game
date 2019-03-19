import React, {Component, Fragment} from 'react';
import Clash from './Clash';
import Clash2 from './Clash2';
import Clash3 from './Clash3'
import {
    GAME_STATES,
    GAME_MODE_ARRAY,
    GAME_MODE,
    OPPONENT_FRACTION_ARRAY,
    OPPONENT_FRACTION,
    CHOOSEN_OPPONENT
} from './config';
import SelectCardToPlay from './SelectCardToPlay';
import WelcomeInfo from "../../components/WelcomeInfo/withLogo";
import Button from "../../components/Button";
import GameModeAndOpponent from "../../components/GameModeAndOpponent";
import './style.scss';

class Game extends Component {
    state = {
        gameState: GAME_STATES.START_GAME,
        playerCards: [],
        playerWon: " ",
    };

    goToSelectCards = () => {
        this.setState({
            gameState: GAME_STATES.SELECT_CARDS
        });
    };

    playAgain = () => {
        this.setState({
            gameState: GAME_STATES.SELECT_CARDS
        })
    };

    checkPlayersDeck = (array) => {
        this.setState({
            playerCards: array,
        })
    };

    goToGameMode = (id) => {
        if (id === GAME_MODE.GAME_MODE_1) {
            this.setState({
                gameState: GAME_STATES.GAME_MODE_1
            })
        }
        if (id === GAME_MODE.GAME_MODE_2) {
            this.setState({
                gameState: GAME_STATES.GAME_MODE_2
            })
        }
        if (id === GAME_MODE.GAME_MODE_3) {
            this.setState({
                gameState: GAME_STATES.GAME_MODE_3
            })
        }
    };

    selectOpponent = (id) => {
        if (id === OPPONENT_FRACTION.SITH) {
            CHOOSEN_OPPONENT.CHOOSEN_OPPONENT = OPPONENT_FRACTION.SITH;
        }
        if (id === OPPONENT_FRACTION.JEDI) {
            CHOOSEN_OPPONENT.CHOOSEN_OPPONENT = OPPONENT_FRACTION.JEDI;
        }
        if (id === OPPONENT_FRACTION.BOUNTY_HUNTERS) {
            CHOOSEN_OPPONENT.CHOOSEN_OPPONENT = OPPONENT_FRACTION.BOUNTY_HUNTERS;
        }
        this.setState({
            gameState: GAME_STATES.SELECT_GAME_MODE,
        });
    };

    goToSelectOpponent = () => {
        const playerCardsLength = this.state.playerCards.length;
        if (playerCardsLength >= 5) {
            this.setState({
                gameState: GAME_STATES.SELECT_OPPONENT,
            })
        } else {
            alert("You must selected five cards")
        }
    };

    goToShowResult = () => {
        this.setState({
            gameState: GAME_STATES.END_GAME,
        })
    };

    whoWon = (playerWon) => {
        this.setState({
            playerWon
        })
    };

    render() {
        const {
            gameState,
            playerWon
        } = this.state;
        return (
            <div className="game">
                <div className="container">
                    {
                        gameState === GAME_STATES.START_GAME &&
                        <Fragment>
                            <header>
                                <WelcomeInfo paragraph='Card game'/>
                            </header>
                            <Button action={this.goToSelectCards} text='Start Game!'/>
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.SELECT_CARDS &&
                        <Fragment>
                            <header>
                                <WelcomeInfo paragraph='Card game'/>
                            </header>
                            <Button
                                text="play"
                                action={this.goToSelectOpponent}
                            />
                            <SelectCardToPlay
                                checkPlayersDeck={this.checkPlayersDeck}
                                playerName='Adam'
                            />
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.SELECT_OPPONENT &&
                        <Fragment>
                            <header>
                                <WelcomeInfo paragraph='Card game'/>
                            </header>
                            <h2 className="c-white">
                                Select your opponent
                            </h2>
                            <GameModeAndOpponent
                                config={OPPONENT_FRACTION_ARRAY}
                                action={this.selectOpponent}
                            />
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.SELECT_GAME_MODE &&
                        <Fragment>
                            <header>
                                <WelcomeInfo paragraph='Card game'/>
                            </header>
                            <h2 className="c-white">
                                Select game mode
                            </h2>
                            <GameModeAndOpponent
                                config={GAME_MODE_ARRAY}
                                action={this.goToGameMode}
                            />
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.GAME_MODE_1 &&
                        <Clash
                            game="game1"
                            goToShowResult={this.goToShowResult}
                            whoWon={this.whoWon}
                        />
                    }
                    {
                        gameState === GAME_STATES.GAME_MODE_2 &&
                        <Clash2
                            game="game2"
                            goToShowResult={this.goToShowResult}
                            whoWon={this.whoWon}
                        />
                    }
                    {
                        gameState === GAME_STATES.GAME_MODE_3 &&
                        <Clash3
                            game="game3"
                            goToShowResult={this.goToShowResult}
                            whoWon={this.whoWon}
                        />
                    }
                    {
                        gameState === GAME_STATES.END_GAME &&
                        <Fragment>
                            <header>
                                <WelcomeInfo paragraph='Card game'/>
                            </header>
                            <h1 className="color-yellow">{playerWon}</h1>
                            <Button text='Play again'
                                    action={this.playAgain}/>
                        </Fragment>
                    }
                </div>
            </div>
        )
    }
}



export default Game;
