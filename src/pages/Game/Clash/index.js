import React, {Component, Fragment} from 'react';
import {
    OPPONENT_FRACTION,
    CHOOSEN_OPPONENT,
    APP_STATES
} from "../config";
import Cards from "../../../components/Cards";
import './styles.scss';
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
    }

    componentDidUpdate() {

        if (this.state.roundCounter >= 5) {
            this.whoWon();
            setTimeout(this.props.goToShowResult, 1000);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.opponentCards && nextProps.deck) {
            this.setState({
                opponentCards: [...nextProps.opponentCards],
                temporaryOpponentCard: [...nextProps.opponentCards][0],
                playerDeck: [...nextProps.deck],
                temporaryChoosenCard: [...nextProps.deck][0],
                appState: APP_STATES.RESULTS,
            });

        } else if (nextProps.error !== null) {
            this.setState({
                appState: APP_STATES.ERROR
            })
        } else if (nextProps.loading) {
            this.setState({
                appState: APP_STATES.LOADING,
            });
        }
    }

    getOpponent = () => {
        const fraction = CHOOSEN_OPPONENT.CHOOSEN_OPPONENT;
        if (this.props.opponentName) {
            this.props.dispatch(fetchOpponentCard(this.props.opponentName));
        } else if (fraction === OPPONENT_FRACTION.SITH) {
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
        } else if (fraction === OPPONENT_FRACTION.REBELS) {
            this.setState({
                appState: APP_STATES.LOADING
            });
            this.props.dispatch(fetchOpponentCard('Rebels'));
        }
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
        if (this.props.playerName === 'Tutorial' && this.props.cardClicked === false) {
            this.props.goToNextModal();
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
            opponentCard.isSelected = '__destroyed-card';
            this.setState({
                playerPoints: this.state.playerPoints + 1,
            })
        } else if (choosenCard.attack - opponentCard.defence < opponentCard.attack - choosenCard.defence) {
            choosenCard.isSelected = '__destroyed-card';
            this.setState({
                opponentPoints: this.state.opponentPoints + 1,
            });
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
        if (this.props.playerName === 'Tutorial' && this.props.playRoundClicked === false) {
            this.props.playRoundClicker();
        }
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
                            {choosenCard.name ? 'Play round' : 'Choose your card!'}
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
                            className={'battleground-clash1'}
                            playerCard={choosenCard}
                            temporaryOpponentCard={temporaryOpponentCard}
                            temporaryChoosenCard={temporaryChoosenCard}
                            isVisible={isVisible}
                        />

                        <Cards
                            deck={opponentCards}
                            nameClass="opponent__cards"
                        />
                        <p className="player-points">{playerPoints}</p>
                        <p className="opponent-points">{opponentPoints}</p>
                    </Fragment>
                }
                <Button className='btn2' text="Go back to start" action={this.props.goBackToStart}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    playerCards: state.data.playerCards,
    opponentCards: state.data.opponentCards,
    playerName: state.data.id,
    deck: state.data.deck,
    loading: state.loading,
    error: state.error,
});

export default connect(mapStateToProps)(Clash);
