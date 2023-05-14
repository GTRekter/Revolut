
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const model = require('./model');

router.put('/hello/:username', async (req, res) => {
    console.log(`PUT /hello/:username begin`)
    try {
        const username = req.params.username;
        console.log(`username: ${username}`)
        const dateOfBirth = req.body.dateOfBirth;
        console.log(`dateOfBirth: ${dateOfBirth}`)
        if (!controller.isValidUsername(username)) {
            console.log(`Invalid username`)
            return res.status(400).send(`The provided username (${username}) is invalid. Please provide a username consisting of letters only.`);
        }
        if (!controller.isValidDateOfBirth(dateOfBirth)) {
            console.log(`Invalid dateOfBirth`)
            return res.status(400).send(`The provided date of birth (${dateOfBirth}) is invalid. Please insert a date in the format YYYY-MM-DD that is before today.`);
        }
        const user = {
            username: username,
            dateOfBirth: dateOfBirth
        }; 
        await model.saveUser(user);
        console.log(`PUT /hello/:username end`)
        return res.sendStatus(204);
    } catch (error) {
        console.log(`PUT /hello/:username end`)
        return res.status(500).send(error.message);
    }    
});
router.get('/hello/:username', async (req, res) => {
    console.log(`GET /hello/:username begin`)
    try {
        const username = req.params.username;   
        console.log(`username: ${username}`)
        const user = await model.getUserByUsername(username);
        console.log(`user: ${user}`)
        if (!user) {
            console.log(`GET /hello/:username end`)
            return res.status(404).send('User not found');
        }
        const message = controller.getBirthdayMessage(username, user.dateOfBirth);
        console.log(`message: ${message}`)
        console.log(`GET /hello/:username end`)
        return res.status(200).send(message);
    } catch (error) {
        console.log(`GET /hello/:username end`)
        return res.status(500).send(error.message);
    }
});
router.get('/', (req, res) => {
  res.status(200).send('Hello revolut!');
});

module.exports = router;
