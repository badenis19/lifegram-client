import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EmptyMessage = ({ message, entity }) => {

    if (entity === "user-profile") {
        return (
            <div className="">
                <p>{message} <Link to={`/newpost`}>Upload first post</Link></p>
            </div>
        )
    } else if (entity === "post-feed") {
        return (
            <div className="">
                <p>{message}</p>
            </div>
        )
    } else if (entity === "search") {
        return (
            <div className="">
                <p>{message}</p>
            </div>
        )
    }
}

EmptyMessage.propTypes = {
    message: PropTypes.string.isRequired,
    entity: PropTypes.string.isRequired
}

export default EmptyMessage;