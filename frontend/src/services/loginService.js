import axios from 'axios';
const loginUrl = '/api/login';

const login = async credentials => {
    try {
        const response = await axios.post(loginUrl, credentials);
        return response.data;
    } catch (error) {
        return false;
    }
}

const createUser = async credentials => {
    const response = await axios.post('/api/users', credentials);
    if (response.status === 201) {
        return true
    } else return false;
}

export { login, createUser};