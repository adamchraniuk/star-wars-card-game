import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const cardStats = ({
    attack,
    defence,
    name
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
    </Fragment>
);

cardStats.propTypes = {
    name: PropTypes.string.isRequired,
    attack: PropTypes.number.isRequired,
    defence: PropTypes.number.isRequired,
};

export default cardStats;