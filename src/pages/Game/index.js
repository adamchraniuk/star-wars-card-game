import React, {Component, Fragment} from 'react';
import Clash from './Clash';
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
        playerDeck: [],
        playerWon: false,
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
            playerDeck: array,
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
        const playerDeckLength = this.state.playerDeck.length;
        if (playerDeckLength >= 5) {
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

    render() {
        const {gameState} = this.state;
        return (
            <div className="game">
                <div className="container">
                    <header>
                        <WelcomeInfo paragraph='Card game'/>
                    </header>
                    {
                        gameState === GAME_STATES.START_GAME &&
                        <Button action={this.goToSelectCards} text='Start Game!'/>
                    }
                    {
                        gameState === GAME_STATES.SELECT_CARDS &&
                        <Fragment>
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
                            <h2 className="c-white">
                                Select game mode
                            </h2>
                            <GameModeAndOpponent config={GAME_MODE_ARRAY}
                                                 action={this.goToGameMode}
                            />
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.GAME_MODE_1 &&
                        <Clash
                            game="game1"
                            goToShowResult={this.goToShowResult}
                        />
                    }
                    {
                        gameState === GAME_STATES.GAME_MODE_2 &&
                        <Clash
                            game="game2"
                        />
                    }
                    {
                        gameState === GAME_STATES.END_GAME &&
                        <Fragment>

                            <h1 className="color-yellow">{this.state.playerWon ? 'Player' : 'Opponent'} is the
                                winner!</h1>
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
