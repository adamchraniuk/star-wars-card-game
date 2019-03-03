import React from 'react';
import PropTypes from 'prop-types'
import Card from '../../../components/Card'
import './style.scss';

const battleground = ({
                          playerCard,
                          opponentCard
                      }) => (
    <div className={"battleground"}>
        <div className='player'>
            {playerCard.name &&
            <Card
                name={playerCard.name}
                attack={playerCard.attack}
                defence={playerCard.defence}
                selectTheCard={playerCard.action}
                id={playerCard.id}
                avatar={playerCard.avatar}
                cardValue={playerCard.cardValue}
                fraction={playerCard.fraction}
                healthPower={playerCard.healthPower}
                key={playerCard.id}
            />
            }
        </div>
        <div className="vs">
            <h1 className='color-orange'>
                V.S
            </h1>
        </div>
        <div className='opponent'>
            {opponentCard &&
            <Card
                name={opponentCard.name}
                attack={opponentCard.attack}
                defence={opponentCard.defence}
                selectTheCard={opponentCard.action}
                id={opponentCard.id}
                avatar={opponentCard.avatar}
                cardValue={opponentCard.cardValue}
                fraction={opponentCard.fraction}
                healthPower={opponentCard.healthPower}
                key={opponentCard.id}
            />
            }
        </div>
    </div>

);


battleground.propTypes = {
    playerCard: PropTypes.object,
    opponentCard: PropTypes.object.isRequired
};

battleground.defaultProps = {
    playerCard: {}
};
export default battleground;