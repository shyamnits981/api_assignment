const express = require("express");
const customer_model = require("../Modals/costomer_modal")
const router = express.Router();

router.post("/customer", (req, res)=> {
    customer_model.find({email: req.body.email}).then((data)=>{
        if(data.length){
            res.send("User with email already registered")
        } else{
            customer_model.create({
                name: req.body.name,
                email: req.body.email
        }).then((data)=> {
                res.status(200).send("Customer Added")
            }).catch((err)=> {
                res.status(400).send(err)
            })
        }
    })
});

router.get("/viewCustomer", (req, res)=>{
    customer_model.find().then((data)=>{
        res.status(200).send({data: data});
    })
})
module.exports = router;