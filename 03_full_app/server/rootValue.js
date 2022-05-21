const axios = require('axios');
const baseUrl = 'http://localhost:5001';

const root = {
    getAllUsers: () => {
        return axios.get(`${baseUrl}/users`).then(({data}) => data);
    },
    createUser: ({input}) => {
        return axios.post(`${baseUrl}/users`, {username: input.username, age: input.age}).then(({data}) => data);
    }
}

module.exports = root;