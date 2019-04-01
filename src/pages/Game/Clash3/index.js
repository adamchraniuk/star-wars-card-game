import React, {Component, Fragment} from 'react';
import {CLASH_STATES} from './config';
import Button from '../../../components/Button'
import "./styles.scss";
import {
    CHOOSEN_OPPONENT,
    OPPONENT_FRACTION,
    // PLAYER_DECK,
    APP_STATES
} from "../config";
import {fetchOpponentCard} from '../../../actions'
import Cards from '../../../components/Cards';
import connect from "react-redux/es/connect/connect";

class Clash3 extends Component {

    state = {
        playerDeck: [],
        opponentDeck: [],
        playerTable: [],
        opponentTable: [],
        yourTurn: true,
        clashState: CLASH_STATES.CHOICE_CARD_TO_ATTACK,
        opponentMana: 1,
        globalMana: 1,
        playerMana: 1,
    };

    componentDidMount() {
        this.getOpponent();
    }

    componentDidUpdate(prevState) {
        if(prevState !== this.state){
            this.gameLoop();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.opponentCards && nextProps.deck) {
            this.setState({
                opponentDeck: nextProps.opponentCards,
                temporaryOpponentCard: nextProps.opponentCards[0],
                playerDeck: nextProps.deck,
                temporaryChoosenCard: nextProps.deck[0],
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

    changeState = ()=> {
        if(this.state.yourTurn) {
            this.setState({
                yourTurn: false,
                globalMana: this.state.globalMana + 1,
                playerMana: this.state.globalMana + 1,
                opponentMana: this.state.globalMana + 1,
            })
        } else {
            alert('nie twoja kolejka, czekaj')
            return
        }
    };

    gameLoop = () =>{
        const yourTurn = this.state.yourTurn;
        const opponentTable = this.state.opponentTable;
        const opponentDeck = this.state.opponentDeck;
        const playerTable = this.state.playerTable;
        if(yourTurn){
            this.movePlayer()
        } else if(!yourTurn && opponentDeck.length >0){
            let timeDelay = Math.random();
            setTimeout(this.makeOpponentChoose, timeDelay*2000);
        } else if (!yourTurn && playerTable.length > 0 && opponentTable.length > 0){
            setTimeout(this.moveOpponent, 200);
        }
    };

    selectCard= (id)=>{
        let playerDeck = this.state.playerDeck;
        const playerTable = this.state.playerTable;
        let choosenCard;
        let playerMana = this.state.playerMana;
        for(let j = 0; j< playerDeck.length; j++) {
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

    makeOpponentChoose = () =>{
        let opponentMana = this.state.opponentMana;
        if(opponentMana > 0) {
            let opponentDeck = this.state.opponentDeck;
            let opponentTable = this.state.opponentTable;
            const index = Math.floor(Math.random() * opponentDeck.length);
            let opponentCard = opponentDeck[index];
            opponentMana -= opponentCard.mana;
            opponentDeck.splice(index, 1);
            opponentTable.push(opponentCard);
            this.setState({
                opponentDeck,
                opponentTable,
                opponentMana,
            })
        } else {
            this.setState({
                yourTurn: true,
            })
        }
    };

    movePlayer = () => {
        const clashState = this.state.clashState;
        if (clashState === CLASH_STATES.CHOICE_CARD_TO_ATTACK) {
            const choosenCard = this.state.choosenCard;
            if(choosenCard) {
                this.setState({
                    clashState: CLASH_STATES.CHOICE_OPPONENT_CARD,
                })
            }
        }
        if(clashState === CLASH_STATES.CHOICE_OPPONENT_CARD){
            const cardToAttack = this.state.cardToAttack;
            if(cardToAttack){
                this.setState({
                    clashState: CLASH_STATES.FIGHT
                })
            }
        }
        if(clashState === CLASH_STATES.FIGHT){
            setTimeout(this.atackOnTheOpponent,1000);
        }
    };

    moveOpponent = () =>{
        const clashState = this.state.clashState;
        if (clashState === CLASH_STATES.CHOICE_CARD_TO_ATTACK){
            setTimeout(this.attackOpponentPhase1, 200);
        }
        if(clashState === CLASH_STATES.CHOICE_OPPONENT_CARD){
            setTimeout(this.attackOpponentPhase2, 500);
        }
        if(clashState === CLASH_STATES.FIGHT){
            setTimeout(this.attackOpponentPhase3, 400);
        }
    };

    choosenCardToAttack = (id) =>{
        const playerTable = this.state.playerTable;
        let playerMana = this.state.playerMana;
        let choosenCard;
        for(let j = 0; j< playerTable.length; j++) {
            if(this.state.yourTurn && playerMana >= playerTable[j].mana) {
                for (let i = 0; i < playerTable.length; i++) {
                    if (id === playerTable[i].id) {
                        choosenCard = playerTable[i];
                        this.setState({
                            choosenCard,
                        })
                    }
                }
            }  else {
                alert("brak many, zakoncz ture");
                return;
            }
            break;
        }
    };

    atackOnTheOpponent = ()=>{
        let cardToAttack = this.state.cardToAttack;
        let opponentTable = this.state.opponentTable;
        let choosenCard = this.state.choosenCard;
        let playerMana = this.state.playerMana;
        cardToAttack.healthPower -= choosenCard.attack;
        playerMana -= choosenCard.mana;
        this.setState({
            clashState: CLASH_STATES.CHOICE_CARD_TO_ATTACK,
            playerMana,
            choosenCard: null,
            cardToAttack: null,
        });
        if(cardToAttack.healthPower <= 0) {
            opponentTable = opponentTable.filter(card => card.id !== cardToAttack.id);
            this.setState({
                opponentTable,
            })
        } else {
            this.setState({
                opponentTable,
            })
        }
    };

    attackOpponentPhase1 = () =>{
        let opponentTable = this.state.opponentTable;
        const playerTable = this.state.playerTable;
        let opponentMana = this.state.opponentMana;
        if(playerTable.length > 0 && opponentTable.length >0) {
            for (let i = 0; i < opponentTable.length; i++) {
                if (!this.state.yourTurn && opponentMana >= opponentTable[i].mana) {
                    const choosenOpponentCard = opponentTable[i];
                    if (choosenOpponentCard) {
                        this.setState({
                            choosenOpponentCard,
                            clashState: CLASH_STATES.CHOICE_OPPONENT_CARD,
                        })
                    }
                } else {
                    this.setState({
                        yourTurn: true,
                    })
                }
                break;
            }
        } else {
            this.setState({
                yourTurn: true,
            })
        }
    };

    attackOpponentPhase2 = () => {
        const playerTable = this.state.playerTable;
        if(this.state.opponentMana > 0 && playerTable.length > 0) {
            const index = Math.floor(Math.random() * playerTable.length);
            const choosenEnemy = playerTable[index];
            if (choosenEnemy) {
                this.setState({
                    choosenEnemy,
                    clashState: CLASH_STATES.FIGHT,
                })
            }
        } else{
            this.setState({
                yourTurn: true,
            })
        }
    };

    attackOpponentPhase3 = () =>{
        let choosenOpponentCard = this.state.choosenOpponentCard;
        let playerTable = this.state.playerTable;
        let choosenEnemy = this.state.choosenEnemy;
        let opponentMana = this.state.opponentMana;
        opponentMana -=choosenOpponentCard.mana;
        choosenEnemy.healthPower -= choosenOpponentCard.attack;
        this.setState({
            clashState: CLASH_STATES.CHOICE_CARD_TO_ATTACK,
            opponentMana,
            choosenOpponentCard: null,
            choosenEnemy: null,
        });
        if(choosenEnemy.healthPower <= 0){
            playerTable = playerTable.filter(card => card.id !== choosenEnemy.id)
            this.setState({
                playerTable,
            })
        } else {
            this.setState({
                playerTable,
            })
        }
    };

    whoWon = () => {
        const playerDeck = this.state.playerDeck.length;
        const playerTable = this.state.playerTable.length;

        if (!playerDeck && !playerTable) {
            const opponentWon = "Sorry, you loose, try again";
            this.props.whoWon(opponentWon);
        } else {
            const playerWon = "Congratulations! You won ;-)";
            this.props.whoWon(playerWon);
        }
    };

    logicButton = () =>{
        const playerDeck = this.state.playerDeck;
        const playerTable = this.state.playerTable;
        const opponentDeck = this.state.opponentDeck;
        const opponentTable = this.state.opponentTable;

        if((!playerDeck.length && !playerTable.length)||(!opponentDeck.length && !opponentTable.length)){
            this.props.goToShowResult()
            this.whoWon();
        }else {
            this.changeState();
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
        } else if (fraction === OPPONENT_FRACTION.REBELS) {
            this.setState({
                appState: APP_STATES.LOADING
            });
            this.props.dispatch(fetchOpponentCard('Rebels'));
        }
    };

    render() {
        const {
            playerDeck,
            opponentDeck,
            opponentTable,
            playerTable,
            opponentMana,
            playerMana,
            yourTurn,
        } = this.state;

        return(
            <Fragment>
                <div
                    className='clash_opponent_deck'
                >
                    {
                        <Cards
                            deck={opponentDeck}
                            nameClass="player__cards"
                        />
                    }
                    <div
                        className="whoseTurn"
                        style={!yourTurn?{borderColor: "lighten(green, 20%)", backgroundColor: "green"}: null}
                    >
                    </div>
                    <p className="mana_level">Mana: {opponentMana}</p>
                </div>
                <div
                    className='clash_opponent_table'
                >
                    {
                        <Cards
                            deck={opponentTable}
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
                            deck={playerTable}
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
                    <p className="mana_level">Mana: {playerMana}</p>
                    <Button text="end round"
                            action={this.logicButton}
                    />
                    <div
                        className="whoseTurn"
                        style={yourTurn?{borderColor: "lighten(green, 20%)", backgroundColor: "green"}: null}
                    >
                    </div>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    playerCards: state.data.playerCards,
    opponentCards: state.data.opponentCards,
    deck: state.data.deck,
    loading: state.loading,
    error: state.error,
});

export default connect(mapStateToProps)(Clash3);
