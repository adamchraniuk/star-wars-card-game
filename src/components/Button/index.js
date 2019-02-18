import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const button = ({
                    text,
                    action,
                    id
                }) => (
    <button className="btn" onClick={action} id={id}>
        {text}
    </button>);

button.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
    id: PropTypes.string,
};

button.defaultProps = {
    action: () => {},
    id: '',
};

export default button;
