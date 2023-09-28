import PropTypes from 'prop-types'
const SuccessNotification = ({ message }) => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    return (
        <div className="success" style={successStyle}>
            {message}
        </div>
    )
}

export default SuccessNotification

SuccessNotification.propTypes = {
    message: PropTypes.string.isRequired
}