// create user form: name, username, password
import {useState} from 'react';
import {createUser} from '../../services/loginService';
import PropTypes from 'prop-types'

const CreateUserForm = ({handleNotification}) => {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await createUser({
            name,
            username,
            password
        });
        if (response) {
            handleNotification('User created successfully', 'success')
        } else {
            handleNotification('Invalid user data', 'error')
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Name</p>
                    <input type="text" onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateUserForm

CreateUserForm.propTypes = {
    handleNotification: PropTypes.func.isRequired
}