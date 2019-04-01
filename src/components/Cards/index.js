import React from 'react';
import PropTypes from "prop-types"
import Card from '../../components/Card';
import './style.scss';

const SelectedCards = ({
                           deck,
                           action,
                           nameClass,
                           pocket,
                       }) => (
    <div className={nameClass + ' selectedCards'}>
            {deck.map((card,index) => {
                    const {
                        id,
                        name,
                        fraction,
                        defence,
                        healthPower,
                        attack,
                        avatar,
                        cardValue,
                        isSelected
                    } = card;
                    return (
                        <Card
                            key={id}
                            name={name}
                            attack={attack}
                            defence={defence}
                            selectTheCard={action}
                            id={id}
                            avatar={avatar}
                            cardValue={cardValue}
                            fraction={fraction}
                            healthPower={healthPower}
                            isSelected={isSelected}
                            positionNumber={index}
                        />
                    )
                }
            )}
        <div className='pocket'>
            {pocket ? <h1 className='color-white'>
                Pocket: {pocket}$</h1> : null}
        </div>
    </div>
);

SelectedCards.propTypes = {
    deck: PropTypes.array.isRequired,
    action: PropTypes.func,
    nameClass: PropTypes.string,
    pocket: PropTypes.number,
};

SelectedCards.defaultProps = {
    nameClass: "all__player__cards",
    pocket: 0,
};

export default SelectedCards;