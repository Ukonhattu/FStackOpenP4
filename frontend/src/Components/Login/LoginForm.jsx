import {useState} from 'react';
import {login} from '../../services/loginService';
import PropTypes from 'prop-types'

const LoginForm = ({setUser, handleNotification}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = async e => {
        e.preventDefault();
        const user = await login({
            username,
            password
        });
        if (user) {
            setUser(() => {
                window.localStorage.setItem('user', JSON.stringify(user))
                return user
            });
        } else {
            handleNotification('Invalid username or password', 'error')
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" name="username" id='username' onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button id='login-button' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm


LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    handleNotification: PropTypes.func.isRequired
}