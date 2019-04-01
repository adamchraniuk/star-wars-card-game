import React, {Component, Fragment} from 'react';
import {
    OPPONENT_FRACTION,
    CHOOSEN_OPPONENT,
    APP_STATES
} from "../config";
import Cards from "../../../components/Cards";
import Battleground from '../Battleground';
import {fetchOpponentCard} from '../../../actions'
import Button from "../../../components/Button";
import connect from "react-redux/es/connect/connect";
class Clash2 extends Component {

    state = {
        opponentCards: [],
        playerDeck: [],
        choosenCard: {},
        opponentCard: {},
        isVisible: false,
        temporaryChoosenCard: {},
        temporaryOpponentCard: {},
    };

    componentDidMount() {
        this.getOpponent();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.state.playerDeck.length || !this.state.opponentCards.length){
            this.whoWon();
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(store.getState())
        if (nextProps.opponentCards && nextProps.deck) {
            this.setState({
                opponentCards: [...nextProps.opponentCards],
                temporaryOpponentCard: nextProps.opponentCards[0],
                playerDeck: [...nextProps.deck],
                temporaryChoosenCard: nextProps.deck[0],
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

    chooseCardToPlay = (id) => {
        const playerDeckLength = this.state.playerDeck.length;
        const playerDeck = this.state.playerDeck;
        const opponentCard = this.state.temporaryChoosenCard;
        const choosenCard = this.state.temporaryOpponentCard;
        opponentCard.isSelected = "";
        choosenCard.isSelected = "";

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
        let opponentCard = this.state.opponentCard;
        let playerDeck = this.state.playerDeck;
        let opponentCards = this.state.opponentCards;

        const index = Math.floor(Math.random() * opponentCards.length);
        opponentCard = opponentCards[index];
        opponentCards.splice(index, 1);
        playerDeck = playerDeck.filter(card => card.id !== choosenCard.id);

        let playerAttack = choosenCard.attack - opponentCard.defence;
        let opponentAttack = opponentCard.attack - choosenCard.defence;

        if (playerAttack >= 0) {
            opponentCard.defence = 0;
            opponentCard.healthPower -= playerAttack;
            if (opponentCard.healthPower <= 0) {
                opponentCard.healthPower = 0;
                opponentCard.isSelected = '__destroyed-card';
                this.setState({
                    opponentCards,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            } else if (opponentCard.healthPower > 0) {
                opponentCards.push(opponentCard);
                opponentCard.isSelected = '__after-attack';
                this.setState({
                    opponentCards,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            }
        } else {
            opponentCard.defence -= choosenCard.attack;
            opponentCard.isSelected = '__decrease-defence';
            opponentCards.push(opponentCard);
            this.setState({
                opponentCards,
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
                choosenCard.isSelected = '__destroyed-card';
                this.setState({
                    playerDeck,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            } else if (choosenCard.healthPower > 0) {
                choosenCard.isSelected = '__after-attack';
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
            choosenCard.isSelected = '__decrease-defence'
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

        if(!playerDeck.length || !opponentCards.length){
            setTimeout(this.props.goToShowResult, 1000);
        }
    };

    getOpponent = () => {
        const fraction = CHOOSEN_OPPONENT.CHOOSEN_OPPONENT;
        if (this.props.opponentName) {
            this.props.dispatch(fetchOpponentCard(this.props.opponentName));
        }
        else if (fraction === OPPONENT_FRACTION.SITH) {
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

    whoWon = () => {
        const playerWon = this.state.playerDeck.length;
        const opponentWon = this.state.opponentCards.length;

        if (!opponentWon) {
            const playerWon = "Congratulations! You won ;-)";
            this.props.whoWon(playerWon);
        } else if (!playerWon) {
            const opponentWon = "Sorry, you loose, try again";
            this.props.whoWon(opponentWon);
        } else if (!opponentWon && !playerWon) {
            const draw = "Draw, you were close";
            this.props.whoWon(draw)
        }
    };


    render() {
        const {
            appState,
            playerDeck,
            opponentCards,
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
                            {choosenCard.name ? 'Play round' : 'Choose your card!'}
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
                        <Cards
                            deck={opponentCards}
                            nameClass="opponent__cards"
                        />
                    </Fragment>
                }

            </div>
        );
    }
}

const mapStateToProps = state => ({
    deck: state.data.deck,
    opponentCards: state.data.opponentCards,
    loading: state.loading,
    error: state.error,
});

export default connect(mapStateToProps)(Clash2);
