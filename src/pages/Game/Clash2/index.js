import React, {Component, Fragment} from 'react';
import {
    OPPONENT_FRACTION,
    CHOOSEN_OPPONENT,
    PLAYER_DECK
} from "../config";
import {APP_STATES} from "../../People/config";
import Cards from "../../../components/Cards";
import Battleground from '../Battleground';
import Button from "../../../components/Button";

class Clash extends Component {

    state = {
        opponentDeck: [],
        playerDeck: [],
        choosenCard: {},
        opponentCard: {},
        isVisible: false,
        temporaryChoosenCard: {},
        temporaryOpponentCard: {},
    };

    componentDidMount() {
        this.getOpponent();
        this.setPlayerDeck();
    }

    setPlayerDeck = () => {
        this.setState({
            playerDeck: PLAYER_DECK.PLAYER_DECK,
            temporaryChoosenCard: PLAYER_DECK.PLAYER_DECK[0],
        })
    };

    chooseCardToPlay = (id) => {
        const playerDeckLength = this.state.playerDeck.length;
        const playerDeck = this.state.playerDeck;
        for (let i = 0; i < playerDeckLength; i++) {
            if (id === playerDeck[i].id) {
                this.setState({
                    choosenCard: playerDeck[i],
                    isVisible: false,
                })
            }
        }
    };

    playRound = () => {
        let choosenCard = this.state.choosenCard;
        if (!choosenCard.name) {
            alert("Choose card");
            return;
        }
        let opponentCard = this.state.opponentCard;
        let playerDeck = this.state.playerDeck;
        let opponentDeck = this.state.opponentDeck;
        const index = Math.floor(Math.random() * opponentDeck.length);
        opponentCard = opponentDeck[index];
        opponentDeck.splice(index, 1);
        playerDeck = playerDeck.filter(card => card.id !== choosenCard.id);
        let playerAttack = choosenCard.attack - opponentCard.defence;
        let opponentAttack = opponentCard.attack - choosenCard.defence;
        if (playerAttack >= 0) {
            opponentCard.defence = 0;
            opponentCard.healthPower -= playerAttack;
            if (opponentCard.healthPower <= 0) {
                opponentCard.healthPower = 0;
                this.setState({
                    opponentDeck,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            } else if (opponentCard.healthPower > 0) {
                opponentDeck.push(opponentCard);
                this.setState({
                    opponentDeck,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            }
        } else {
            opponentCard.defence -= choosenCard.attack;
            opponentDeck.push(opponentCard);
            this.setState({
                opponentDeck,
                choosenCard: {},
                opponentCard: {},
                temporaryChoosenCard: choosenCard,
                temporaryOpponentCard: opponentCard,
                isVisible: true,
            })
        }
        if (opponentAttack > 0) {
            choosenCard.defence = 0;
            choosenCard.healthPower -= opponentAttack;
            if (choosenCard.healthPower <= 0) {
                choosenCard.healthPower = 0;
                this.setState({
                    playerDeck,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            } else if (choosenCard.healthPower > 0) {
                playerDeck.push(choosenCard);
                this.setState({
                    playerDeck,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            }
        } else {
            choosenCard.defence -= opponentCard.attack;
            playerDeck.push(choosenCard);
            this.setState({
                playerDeck,
                choosenCard: {},
                opponentCard: {},
                temporaryChoosenCard: choosenCard,
                temporaryOpponentCard: opponentCard,
                isVisible: true,
            })
        }
    };

    getOpponent = () => {
        const fraction = CHOOSEN_OPPONENT.CHOOSEN_OPPONENT;
        if (fraction === OPPONENT_FRACTION.SITH) {
            this.setState({
                appState: APP_STATES.LOADING,
            });

            fetch('http://localhost:8000/Sith')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error!');
                    }
                })
                .then(response => {
                    this.setState({
                        appState: APP_STATES.RESULTS,
                        opponentDeck: response,
                        temporaryOpponentCard: response[0],
                    })
                })
                .catch(error => {
                    this.setState({
                        appState: APP_STATES.ERROR,
                    })
                })
        } else if (fraction === OPPONENT_FRACTION.BOUNTY_HUNTERS) {
            this.setState({
                appState: APP_STATES.LOADING
            });

            fetch('http://localhost:8000/Bounty_Hunters')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error!');
                    }
                })
                .then(response => {
                    this.setState({
                        appState: APP_STATES.RESULTS,
                        opponentDeck: response,
                        temporaryOpponentCard: response[0],
                    })
                })
                .catch(error => {
                    this.setState({
                        appState: APP_STATES.ERROR,
                    })
                })
        } else if (fraction === OPPONENT_FRACTION.JEDI) {
            this.setState({
                appState: APP_STATES.LOADING
            });

            fetch('http://localhost:8000/Jedi')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error!');
                    }
                })
                .then(response => {
                    this.setState({
                        appState: APP_STATES.RESULTS,
                        opponentDeck: response,
                        temporaryOpponentCard: response[0],
                    })
                })
                .catch(error => {
                    this.setState({
                        appState: APP_STATES.ERROR,
                    })
                })
        }
    };

    whoWon = () => {
        const playerWon = this.state.playerDeck.length;
        const opponentWon = this.state.opponentDeck.length;

        if (!opponentWon) {
            const playerWon = "Congratulations! You won ;-)";
            this.props.whoWon(playerWon);
        } else if (!playerWon) {
            const opponentWon = "Sorry, you loose, try again";
            this.props.whoWon(opponentWon);
        } else {
            const draw = "Draw, you were close";
            this.props.whoWon(draw)
        }
    };

    render() {
        const {
            appState,
            playerDeck,
            opponentDeck,
            temporaryChoosenCard,
            temporaryOpponentCard,
            choosenCard,
            opponentCard,
            isVisible,
        } = this.state;

        return (
            <div className="clash">
                {
                    appState === APP_STATES.LOADING &&
                    <h1 className="color-white">Loading. Please wait.</h1>
                }
                {
                    appState === APP_STATES.RESULTS &&
                    <Fragment>
                        <h1 className="color-white">
                            Choose your card!
                        </h1>
                        <Cards
                            deck={playerDeck}
                            nameClass="player__cards"
                            action={this.chooseCardToPlay}
                        />
                        {
                            choosenCard.name
                            &&
                            <Button
                                action={this.playRound}
                                text="Play round"
                                id="playRound"
                            />
                        }
                        <Battleground
                            opponentCard={opponentCard}
                            playerCard={choosenCard}
                            temporaryOpponentCard={temporaryOpponentCard}
                            temporaryChoosenCard={temporaryChoosenCard}
                            isVisible={isVisible}
                        />
                        {
                            (!playerDeck.length || !opponentDeck.length)
                            &&
                            <Button
                                action={() => {
                                    this.whoWon();
                                    this.props.goToShowResult();
                                }}
                                text="Show result"
                            />
                        }
                        <Cards
                            deck={opponentDeck}
                            nameClass="opponent__cards"
                        />
                    </Fragment>
                }
            </div>
        );
    }
}


export default Clash;