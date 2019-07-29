const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('../models/Group');
const Group = mongoose.model('groups');

/* GET creat group form. */
const create = (req, res) => {
    res.render('create-group');
};


/* GET group page. */
const show = (req, res) => {
    Group.find({})
    .sort({date:'desc'})
    .then(groups => {
        res.render('group', {
            groups: groups
        });
    })
};


/* POST save new group in DB. */
const store = (req, res) => {
    let errors = [];

    if (!req.body.name) {
        errors.push({text:'Please add a name for group'});
    }

    if (!req.body.amount) {
        errors.push({text:'please add an amount'});
    }

    if (!req.body.frequency) {
        errors.push({text:'Please add frequency'});
    }

    if (!req.body.bankName) {
        errors.push({text:'Please add name of bank'});
    }

    if (!req.body.accountNumber) {
        errors.push({text:'Please add account number'});
    }

    if (errors.length > 0) {
        res.render('/create-group', {
            errors: errors,
            name: req.body.name,
            amount: req.body.amount,
            frequency: req.body.frequency,
            bankName: req.body.bankName,
            accountNumber: req.body.accountNumber
        });
    } else {
        const newGroup = {
            name: req.body.name,
            amount: req.body.amount,
            frequency: req.body.frequency,
            bankName: req.body.bankName,
            accountNumber: req.body.accountNumber
        }
        new Group(newGroup).save()
        .then(group => {
            res.redirect('/group');
        })
    }
};


module.exports = {create, show, store};