
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const model = require('./model');

router.put('/hello/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const dateOfBirth = req.body.dateOfBirth;
        if (!controller.isValidUsername(username)) {
            return res.status(400).send(`The provided username is invalid. Please provide a username consisting of letters only.`);
        }
        if (!controller.isValidDateOfBirth(dateOfBirth)) {
            return res.status(400).send(`The provided date of birth is invalid. Please insert a date in the format YYYY-MM-DD that is before today.`);
        }
        const user = {
            username: username,
            dateOfBirth: dateOfBirth
        }; 
        await model.saveUser(user);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).send(error.message);
    }    
});

router.get('/hello/:username', async (req, res) => {
    try {
        const username = req.params.username;   
        const user = await model.getUserByUsername(username);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const message = controller.getBirthdayMessage(username, user.dateOfBirth);
        return res.status(200).send(message);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;
