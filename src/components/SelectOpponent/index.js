import React from 'react';
import Button from "../../components/Button";
import PropTypes from "prop-types"

const SelectOpponent = ({
                            config,
                            selectOpponent
                        }) => (
    config.map(opponents => (
        <Button text={opponents.name}
                key={opponents.id}
                id={opponents.id}
                action={() => selectOpponent(opponents.id)}
        />
    ))
);

SelectOpponent.propTypes = {
    selectOpponent: PropTypes.func,
    config: PropTypes.array
};

SelectOpponent.defaultProps = {
    selectOpponent: () => {
    },
    config: []
};
export default SelectOpponent;
