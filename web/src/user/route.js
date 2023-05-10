
const express = require('express');
const moment = require('moment');
const router = express.Router();
const controller = require('./controller');
const model = require('./model');

router.put('/hello/:username', (req, res) => {
    const username = req.params.username;
    const dateOfBirth = req.body.dateOfBirth;
    if (!controller.isValidUsername(username)) {
        return res.status(400).send('Invalid username');
    }
    if (!controller.isValidDateOfBirth(dateOfBirth)) {
      return res.status(400).send('Invalid date of birth');
    }
    const user = {
        username: username,
        dateOfBirth: dateOfBirth
    };
    try {
        model.saveUser(user);
    } catch (error) {
        return res.sendStatus(500);
    }
    return res.sendStatus(204);
});

router.get('/hello/:username', async(req, res) => {
    const username = req.params.username;
    const user = await model.getUserByUsername(username);
    if(user === undefined) {
        return res.status(404).send('User not found');
    }
    const message = controller.getBirthdayMessage(username, user.dateOfBirth);
    return res.status(200).send(message);
});

module.exports = router;