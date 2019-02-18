import React from 'react';
import PropTypes from 'prop-types'
import './style.scss';

const footer = ({paragraph}) => (
    <div className="footer">
        {paragraph && <p>{paragraph}</p>}
    </div>
);

footer.propTypes = {
    paragraph: PropTypes.string,
};

footer.defaultProps = {
    paragraph: "Default footer",
};
export default footer;