import React, {Component, Fragment} from 'react';
import {OPPONENT_FRACTION, CHOOSEN_OPPONENT, GAME_STATES, PLAYER_DECK} from "../../pages/Game/config";
import {APP_STATES} from "../../pages/People/config";
import Cards from "../../components/Cards";


class Clash extends Component {

    state = {
        opponentDeck: [],
        playerDeck: []
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
        console.log(id)
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
            opponentDeck
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
                        <div className='battleground'>
                        </div>
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