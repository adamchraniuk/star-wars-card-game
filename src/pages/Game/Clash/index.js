import React, {Component, Fragment} from 'react';
import {
    OPPONENT_FRACTION,
    CHOOSEN_OPPONENT,
    PLAYER_DECK,
    APP_STATES
} from "../config";
import Cards from "../../../components/Cards";
import Battleground from '../Battleground';
import {fetchOpponentCard} from '../../../actions'
import Button from "../../../components/Button";
import connect from "react-redux/es/connect/connect";

class Clash extends Component {

    state = {
        opponentCards: [],
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.opponentCards) {
            this.setState({
                opponentCards: nextProps.opponentCards,
                temporaryOpponentCard: nextProps.opponentCards[0],
                appState: APP_STATES.RESULTS,
            });
        } else if (nextProps.error !== null) {
            this.setState({
                appState: APP_STATES.ERROR
            })
        } else {
            this.setState({
                appState: APP_STATES.LOADING,
            });
        }
    }
    getOpponent = () => {
        const fraction = CHOOSEN_OPPONENT.CHOOSEN_OPPONENT;
        if (fraction === OPPONENT_FRACTION.SITH) {
            this.setState({
                appState: APP_STATES.LOADING,
            });
            this.props.dispatch(fetchOpponentCard('Sith'));

        } else if (fraction === OPPONENT_FRACTION.BOUNTY_HUNTERS) {
            this.setState({
                appState: APP_STATES.LOADING
            });
            this.props.dispatch(fetchOpponentCard('Bounty_Hunters'));

        } else if (fraction === OPPONENT_FRACTION.JEDI) {
            this.setState({
                appState: APP_STATES.LOADING
            });
            this.props.dispatch(fetchOpponentCard('Jedi'));
        }
    };

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
        let opponentCard = this.state.opponentCard;
        let playerDeck = this.state.playerDeck;
        const opponentCards = this.state.opponentCards;
        const index = Math.floor(Math.random() * opponentCards.length);
        opponentCard = opponentCards[index];
        opponentCards.splice(index, 1);
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
            opponentCards,
            isVisible: true,
            opponentCard: {},
            choosenCard: {},
            temporaryOpponentCard: opponentCard,
            temporaryChoosenCard: choosenCard,
        });
    };

    whoWon = () => {
        const playerPoints = this.state.playerPoints;
        const opponentPoints = this.state.opponentPoints;
        if (playerPoints > opponentPoints) {
            const playerWon = "Congratulations! You won ;-)";
            this.props.whoWon(playerWon);
        } else if (opponentPoints > playerPoints) {
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
            opponentCards,
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
                            choosenCard.name && roundCounter < 5
                            &&
                            <Button
                                action={this.playRound}
                                text="Play round"
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
                                action={() => {
                                    this.whoWon();
                                    this.props.goToShowResult();
                                }}
                                text="Show result"
                            />
                        }
                        <Cards
                            deck={opponentCards}
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

const mapStateToProps = state => ({
    playerCards: state.data.playerCards,
    opponentCards: state.data.opponentCards,
    loading: state.loading,
    error: state.error,
});

export default connect(mapStateToProps)(Clash);
