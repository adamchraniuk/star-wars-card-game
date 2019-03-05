import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const cardStats = ({
                       attack,
                       defence,
                       name,
                       fraction,
                       healthPower,
                       cardValue,
                   }) => (
    <Fragment>
        <h2 className="card__name">
            {name}
        </h2>
        <p className="card__attack">
            Attack: {attack}
        </p>
        <p className="card__attack">
            Defence: {defence}
        </p>
        <p className="card__fraction">
            Fraction: {fraction}
        </p>
        <p className="card__cardValue">
            Card value: {cardValue}
        </p>
        <h2 className="card__health">
            Health: {healthPower}
        </h2>
    </Fragment>
);

cardStats.propTypes = {
    name: PropTypes.string.isRequired,
    attack: PropTypes.number.isRequired,
    defence: PropTypes.number.isRequired,
    cardValue: PropTypes.number.isRequired,
    fraction: PropTypes.string.isRequired,
    healthPower: PropTypes.number.isRequired
};

export default cardStats;