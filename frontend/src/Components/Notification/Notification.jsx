import PropTypes from 'prop-types'
import SuccessNotification from './SuccessNotification'
import ErrorNotification from './ErrorNotification'

const Notification = ({ notification}) => {
    const { message, type } = notification
    if (message === null) {
        return null
    }
    if (type === 'success') {
        console.log('success')
        return (
            <SuccessNotification message={message} />
        )
    }
    if (type === 'error') {
        return (
            <ErrorNotification message={message} />
        )
    }
    console.log('null')
    return null
    
}

export default Notification

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    notification: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string
    })
}
