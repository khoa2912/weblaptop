var  env = require('dotenv').config();
const fetch = require("node-fetch");
module.exports = {
    create 
};
function create(user,screen, action, type,content) {
    let auth = 'Bearer ' + process.env.TOKEN;  
    var value = {
        Token:process.env.TOKEN,
        userToken:user,
        Screen: screen,
        Action:action,
        Type:type,
        Content:content        
    }
    const requestOptions = {
        method: 'POST',
        headers: { auth, 'Content-Type': 'application/json' },    
        body: JSON.stringify(value)
    };
    fetch(process.env.REACT_APP_API_LOG_URL+`/log/create`, requestOptions)
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}