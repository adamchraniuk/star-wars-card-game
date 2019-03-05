import React from 'react';
import PropTypes from "prop-types"
import Card from '../../components/Card';
import Coverflow from 'react-coverflow';
import './style.scss';

const SelectedCards = ({
                           deck,
                           action,
                           nameClass,
                           pocket,
                           active
                       }) => (
    <div className={nameClass + ' selectedCards'}>
        <Coverflow
            width={960}
            height={300}
            displayQuantityOfSide={3}
            currentFigureScale={.9}
            otherFigureScale={.5}
            navigation={true}
            enableHeading={false}
            active={active}
            enableScroll={false}
        >
            {deck.map((card) => {
                    const {
                        id,
                        name,
                        fraction,
                        defence,
                        healthPower,
                        attack,
                        avatar,
                        cardValue,
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
                        />
                    )
                }
            )}
        </Coverflow>
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