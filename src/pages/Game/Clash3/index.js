import React, {Component, Fragment} from 'react';
import {CLASH_STATES} from './config';
import "./styles.scss";
import {
    CHOOSEN_OPPONENT,
    OPPONENT_FRACTION,
    PLAYER_DECK,
    APP_STATES
} from "../config";
import {fetchOpponentCard} from '../../../actions'
import Cards from '../../../components/Cards';
import connect from "react-redux/es/connect/connect";

class Clash3 extends Component {

    state = {
        playerDeck: [],
        opponentCards: [],
        playerTable: [],
        opponentTable: [],
        yourTurn: true,
        clashState: CLASH_STATES.CHOICE_CARD_TO_ATTACK,
        opponentMana: 1,
        globalMana: 1,
        playerMana: 1,
    };

    changeState = () => {
        this.setState({
            yourTurn: false,
            globalMana: this.state.globalMana + 1,
            playerMana: this.state.globalMana + 1,
        })
    };

    componentDidMount() {
        this.getOpponent();
        this.setPlayerDeck();
        setInterval(this.gameLoop, 500);
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

    gameLoop = () => {
        const yourTurn = this.state.yourTurn;
        if (yourTurn) {
            this.movePlayer()
        } else if (!yourTurn) {
            this.makeOpponentChoose();
        }
    };

    makeOpponentChoose = () => {
        let opponentCards = this.state.opponentCards;
        let opponentTable = this.state.opponentTable;
        const index = Math.floor(Math.random() * opponentCards.length);
        let opponentCard = opponentCards[index];
        opponentCards.splice(index, 1);
        opponentTable.push(opponentCard);
        this.setState({
            yourTurn: true,
            opponentCards,
            opponentTable,
        })
    };

    selectCard = (id) => {
        let playerDeck = this.state.playerDeck;
        const playerTable = this.state.playerTable;
        let choosenCard;
        let playerMana = this.state.playerMana;
        for (let j = 0; j < playerDeck.length; j++) {
            if (this.state.yourTurn && playerMana >= playerDeck[j].mana) {
                for (let i = 0; i < playerDeck.length; i++) {
                    if (id === playerDeck[i].id) {
                        choosenCard = playerDeck[i];
                        playerMana -= choosenCard.mana;
                        playerTable.push(choosenCard);
                        playerDeck = playerDeck.filter(card => card.id !== id);
                        this.setState({
                            playerTable,
                            playerDeck,
                            playerMana,
                        });
                        break;
                    }
                }
            } else {
                alert('brak many, zakończ turę');
                return;
            }
            break;
        }
    };
    movePlayer = () => {
        const clashState = this.state.clashState;
        if (clashState === CLASH_STATES.CHOICE_CARD_TO_ATTACK) {
            const choosenCard = this.state.choosenCard;
            if (choosenCard) {
                this.setState({
                    clashState: CLASH_STATES.CHOICE_OPPONENT_CARD,
                })
            }
        }
        if (clashState === CLASH_STATES.CHOICE_OPPONENT_CARD) {
            const cartToAttack = this.state.cardToAttack;
            if (cartToAttack) {
                this.setState({
                    clashState: CLASH_STATES.FIGHT
                })
            }
        }
        if (clashState === CLASH_STATES.FIGHT) {
            setTimeout(this.atackOnTheOpponent(), 2000);
        }
    };

    atackOnTheOpponent = () => {
        let cardToAttack = this.state.cardToAttack;
        let opponentTable = this.state.opponentTable;
        let choosenCard = this.state.choosenCard;
        let playerMana = this.state.playerMana;
        cardToAttack.hp -= choosenCard.attack;
        playerMana -= choosenCard.mana;
        this.setState({
            clashState: CLASH_STATES.CHOICE_CARD_TO_ATTACK,
            playerMana,
            choosenCard: null,
            cardToAttack: null,
        });
        if (cardToAttack.hp <= 0) {
            opponentTable = opponentTable.filter(card => card.id !== cardToAttack.id);
            console.log(opponentTable);
            this.setState({
                opponentTable,
            })
        } else {
            this.setState({
                opponentTable,
            })
        }
    };

    choosenCardToAttack = (id) => {
        const playerTable = this.state.playerTable;
        let playerMana = this.state.playerMana;
        let choosenCard;
        for (let j = 0; j < playerTable.length; j++) {
            if (this.state.yourTurn && playerMana >= playerTable[j].mana) {
                for (let i = 0; i < playerTable.length; i++) {
                    if (id === playerTable[i].id) {
                        choosenCard = playerTable[i];
                        this.setState({
                            choosenCard,
                        })
                    }
                }
            } else {
                alert("brak many, zakoncz ture");
                return;
            }
            break;
        }
    };

    choiceOpponentCard = (id) => {
        const opponentTable = this.state.opponentTable;
        let cardToAttack;
        for (let i = 0; i < opponentTable.length; i++) {
            if (id === opponentTable[i].id) {
                cardToAttack = opponentTable[i];
                this.setState({
                    cardToAttack,
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
        })
    };

    render() {
        const {
            playerDeck,
            opponentCards,
            opponentTable,
            playerTable,
            playerMana,
        } = this.state;
        console.log(playerDeck);
        console.log(opponentCards);
        return (
            <Fragment>
                <div
                    className='clash_opponent_deck'
                >
                    {
                        <Cards
                            deck={opponentCards}
                            nameClass="player__cards"
                        />
                    }
                </div>
                <div
                    className='clash_opponent_table'
                >
                    {
                        <Cards
                            deck={opponentCards}
                            nameClass="player__cards"
                            action={this.choiceOpponentCard}
                        />
                    }
                </div>
                <div
                    className='clash_player_table'
                >
                    {
                        <Cards
                            deck={playerDeck}
                            nameClass="player__cards"
                            action={this.choosenCardToAttack}
                        />
                    }
                </div>
                <div
                    className='clash_player_deck'
                >
                    {
                        <Cards
                            deck={playerDeck}
                            nameClass="player__cards"
                            action={this.selectCard}
                        />
                    }
                    <p>{playerMana}</p>
                    <button onClick={this.changeState}>End round</button>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    playerCards: state.data.playerCards,
    opponentCards: state.data.opponentCards,
    loading: state.loading,
    error: state.error,
});

export default connect(mapStateToProps)(Clash3);
