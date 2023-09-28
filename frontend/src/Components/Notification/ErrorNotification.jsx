import PropTypes from 'prop-types';

const ErrorNotification = ({ message }) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    return (
        <div className="error" style={errorStyle}>
            {message}
        </div>
    )
}

export default ErrorNotification

ErrorNotification.propTypes = {
    message: PropTypes.string.isRequired
}
