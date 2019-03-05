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
        temporaryChoosenCard: {},
        temporaryOpponentCard: {},
        playerPoints: 0,
        opponentPoints: 0,
        roundCounter: 0,
        isVisible: false,
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
        const choosenCard = this.state.choosenCard;
        if (!choosenCard.name) {
            alert("Choose card");
            return;
        }
        let opponentCard = this.state.opponentCard;
        let playerDeck = this.state.playerDeck;
        const opponentDeck = this.state.opponentDeck;
        const index = Math.floor(Math.random() * opponentDeck.length);
        opponentCard = opponentDeck[index];
        opponentDeck.splice(index, 1);
        playerDeck = playerDeck.filter(card => card.id !== choosenCard.id);
        if (choosenCard.attack - opponentCard.defence > opponentCard.attack - choosenCard.defence) {
            this.setState({
                playerPoints: this.state.playerPoints + 1,
            })
        } else if (choosenCard.attack - opponentCard.defence < opponentCard.attack - choosenCard.defence) {
            this.setState({
                opponentPoints: this.state.opponentPoints + 1,
            })
        } else {
            this.setState({
                playerPoints: this.state.playerPoints,
                opponentPoints: this.state.opponentPoints,
            })
        }
        this.setState({
            roundCounter: this.state.roundCounter + 1,
            playerDeck,
            opponentDeck,
            isVisible: true,
            opponentCard: {},
            choosenCard: {},
            temporaryOpponentCard: opponentCard,
            temporaryChoosenCard: choosenCard,
        })

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

    render() {
        const {
            appState,
            playerDeck,
            opponentDeck,
            choosenCard,
            opponentCard,
            temporaryChoosenCard,
            temporaryOpponentCard,
            playerPoints,
            opponentPoints,
            roundCounter,
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
                            roundCounter === 5
                            &&
                            <Button
                                action={this.props.goToShowResult}
                                text="Show result"
                            />
                        }


                        <Cards
                            deck={opponentDeck}
                            nameClass="opponent__cards"
                        />
                        <p className="player-points">{playerPoints}</p>
                        <p className="opponent-points">{opponentPoints}</p>
                    </Fragment>
                }
            </div>
        );
    }
}


export default Clash;