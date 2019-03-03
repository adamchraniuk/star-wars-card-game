import React, {Component, Fragment} from 'react';
import {OPPONENT_FRACTION, CHOOSEN_OPPONENT, GAME_STATES, PLAYER_DECK} from "../config";
import {APP_STATES} from "../../People/config";
import Cards from "../../../components/Cards";
import Battleground from '../Battleground';


class Clash extends Component {

    state = {
        opponentDeck: [],
        playerDeck: [],
        choosenCard: {},
        opponentCard: {}
    };

    componentDidMount() {
        this.getOpponent();
        this.setPlayerDeck();
    }

    setPlayerDeck = () => {
        this.setState({
            playerDeck: PLAYER_DECK.PLAYER_DECK
        })
    };

    chooseCardToPlay = (id) => {
        const playerDeckLength = this.state.playerDeck.length;
        const playerDeck = this.state.playerDeck;
        for (let i = 0; i < playerDeckLength; i++) {
            if (id === playerDeck[i].id) {
                this.setState({
                    choosenCard: playerDeck[i]
                })
            }
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
                        opponentDeck: response
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
                        opponentDeck: response
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
                        opponentDeck: response
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
            opponentCard
        } = this.state;
        return (
            <div>
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
                        <Battleground
                            opponentCard={opponentDeck[0]}
                            playerCard={choosenCard}
                        />
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