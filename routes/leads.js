const express = require('express');
const leadsModel = require('../models/leads_model')
const router = express.Router();


// Read
router.get('/', async (req, res) => {
    try {
        const leads = await leadsModel.find();
        res.json(leads);
    } catch (error) {
        res.json({message : error.message});    
    }
});


// Read by id
router.get('/:id',(req, res) => {
    res.send(req.params.id)
});


// Create/Add lead
router.post('/addlead', async(req, res) => {
    const lead = new leadsModel({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company, 
        Website: req.body.website, 
        city: req.body.city, 
    })
    try {
        const newLead = await lead.save()
        res.json(newLead);
    } catch (error) {
        res.json({message : error.message});    
    }
});

module.exports = router;