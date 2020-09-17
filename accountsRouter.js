const express = require('express');
const { set } = require('./api/server');

const db = require('./data/dbConfig');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
   const accounts = await db('accounts');
        res.json(accounts)
        
    } catch (err) {
        res.status(500).json({message: 'error getting accounts', error:err})
    }
});

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const [accounts] = await db('accounts').where({ id });
            if (accounts) {
                res.json(accounts);
            } else {
                res.status(404).json({ message: 'bad id' });
            }
        } catch (err) {
            res.status(500).json({ message: 'db error', error: err });
        }
    });


router.post('/', async (req, res) => {
    const accountData = req.body;

    try {
        const account = await db.insert(accountData).into('accounts');
        res.status(201).json(account);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'db problem', error: err });
    }});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    db('accounts').where({ id }).update(changes)
    .then(account => {
        if (account) {
            res.status(200).json({ updated: req.body});
            
        } else {
            res.status(404).json({message: 'invalid ID'});
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'db problem' });
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const account = await db.del().from('accounts').where({ id });
        account ? res.status(200).json({ deleted: account })
            : res.status(404).json({ message: 'invalid id' });
    } catch (err) {
        res.status(500).json({ message: 'database error', error: err });
    }


}); 

module.exports = router;