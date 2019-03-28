import React, {Component, Fragment} from 'react';
import Clash from './Clash';
import Clash2 from './Clash2';
import Clash3 from './Clash3';
import Tutorial from './Tutorial';
import {
    GAME_STATES,
    GAME_MODE_ARRAY,
    GAME_MODE,
    OPPONENT_FRACTION_ARRAY,
    OPPONENT_FRACTION,
    CHOOSEN_OPPONENT,
    PLAYER_DECK
} from './config';
import SelectCardToPlay from './SelectCardToPlay';
import Shop from './Shop';
import WelcomeInfo from "../../components/WelcomeInfo/withLogo";
import Button from "../../components/Button";
import GameModeAndOpponent from "../../components/GameModeAndOpponent";
import {savePlayerCards} from '../../actions'
import './style.scss';
import connect from "react-redux/es/connect/connect";

class Game extends Component {
    state = {
        gameState: GAME_STATES.START_GAME,
        playerWon: " ",
    };

    goToSelectCards = () => {
        this.setState({
            gameState: GAME_STATES.SELECT_CARDS
        });
    };
    goToTutorial = () => {
        this.setState({
            gameState: GAME_STATES.TUTORIAL
        });
    };
    goToShop = () => {
        this.setState({
            gameState: GAME_STATES.SHOP
        });
    };
    goBackToStart = () => {
        this.setState({
            gameState: GAME_STATES.START_GAME
        })
    };
    playAgain = () => {
        this.setState({
            gameState: GAME_STATES.SELECT_CARDS
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
        if (id === OPPONENT_FRACTION.REBELS) {
            CHOOSEN_OPPONENT.CHOOSEN_OPPONENT = OPPONENT_FRACTION.REBELS;
        }
        if (id === OPPONENT_FRACTION.BOUNTY_HUNTERS) {
            CHOOSEN_OPPONENT.CHOOSEN_OPPONENT = OPPONENT_FRACTION.BOUNTY_HUNTERS;
        }
        if(id === OPPONENT_FRACTION.REBELS){
            CHOOSEN_OPPONENT.CHOOSEN_OPPONENT = OPPONENT_FRACTION.REBELS;
        }
        this.setState({
            gameState: GAME_STATES.SELECT_GAME_MODE,
        });
    };

    goToSelectOpponent = () => {
        if (PLAYER_DECK.PLAYER_DECK.length === 5) {
            this.setState({
                gameState: GAME_STATES.SELECT_OPPONENT,
            });
            this.props.dispatch(savePlayerCards(this.props.playerName, this.props.pocket));
        } else {
            alert('select five cards');
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
                            <Button className='menu-button' action={this.goToSelectCards} text='Start Game!'/>
                            <Button className='menu-button' action={this.goToShop} text='Buy new cards'/>
                            <Button className='menu-button' action={this.goToTutorial} text='Play tutorial'/>
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.TUTORIAL &&
                        <Fragment>
                            <header>
                                <WelcomeInfo paragraph='Card game'/>
                            </header>
                            <Tutorial goBackToStart={this.goBackToStart}/>
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.SELECT_CARDS &&
                        <Fragment>
                            <header>
                                <WelcomeInfo paragraph='Card game'/>
                            </header>
                            {
                                this.props.playerName &&
                                <Button
                                    text="play"
                                    action={this.goToSelectOpponent}
                                />
                            }
                            <SelectCardToPlay playerName='Adam'/>
                            <Button text="Go back" action={this.goBackToStart}/>
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
                        gameState === GAME_STATES.SHOP &&
                        <Fragment>
                            <header>
                                <WelcomeInfo paragraph='Card game'/>
                            </header>
                            <Shop
                                playerName='Adam'
                                goBackToStart={this.goBackToStart}
                            />
                            <Button text="Go back" action={this.goBackToStart}/>
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
                        <Fragment>
                            <Clash
                                game="game1"
                                goToShowResult={this.goToShowResult}
                                whoWon={this.whoWon}
                                goBackToStart={this.goBackToStart}
                            />
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.GAME_MODE_2 &&
                        <Fragment>

                            <Clash2
                                game="game2"
                                goToShowResult={this.goToShowResult}
                                whoWon={this.whoWon}
                                goBackToStart={this.goBackToStart}
                            />

                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.GAME_MODE_3 &&
                        <Fragment>
                            <Clash3
                                game="game3"
                                goToShowResult={this.goToShowResult}
                                whoWon={this.whoWon}
                            />
                            <Button text="Go back to start" action={this.goBackToStart}/>
                        </Fragment>

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

const mapStateToProps = state => ({
    playerName: state.data.id,
    pocket: state.data.pocket
});


export default connect(mapStateToProps)(Game);
