import PropTypes from 'prop-types'

const Message = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="message">{message}</div>
    )
}

Message.propTypes = {
    message: PropTypes.string.isRequired
}

export default Message