import PropTypes from 'prop-types'

const Error = ({ error }) => {
    if (error === null) {
        return null
    }
    return (
        <div className="error">{error}</div>
    )
}

Error.propTypes = {
    error: PropTypes.string.isRequired
}

export default Error