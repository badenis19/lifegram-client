import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, InlineIcon } from '@iconify/react';
import armFlex from '@iconify/icons-mdi/arm-flex';


const EmptyMessage = ({ message, entity }) => {

    if (entity === "user-profile") {
        return (
            <div className="message-container">
                <Icon icon={armFlex} />
                <p>{message}</p>
                <p><Link to={`/newpost`}>Upload first post</Link></p>
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