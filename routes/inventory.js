const express = require("express");
const inventory_model = require("../Modals/inventory_modal");
const order_modal = require("../Modals/order_modal")
const router = express.Router();


router.post("/item", (req, res)=> {
    inventory_model.find({ inventory_id: req.body.inventory_id }).then((data) => {
        if (data.length) {
            const quantity=(data[0].available_quantity)+(req.body.available_quantity)
            inventory_model.updateOne({ inventory_id: req.body.inventory_id },{$set: {available_quantity:quantity}}).then((data)=>{
                res.status(200).send("Inventory Added Sucessfully")
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        } else {
            inventory_model.create({
            item_name:req.body.item_name,
            inventory_type:req.body.inventory_type,
            available_quantity:req.body.available_quantity
            }).then((data)=>{
                res.status(200).send(`New Inventory added successfully`)
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        }
    }).catch((err) => {
        res.status(400).send(err.message)
    })
});


router.get("/viewItem", (req, res)=>{
    inventory_model.find().then((data)=>{
        res.status(200).send({data: data});
    })
})


//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedInventory = await inventory_model.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedInventory);
    } catch (err) {
        res.status(500).json(err)
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        await inventory_model.findByIdAndDelete(req.params.id);
        res.status(200).json("Inventory has been deleted");
    } catch (err) {
        res.status(500).json(err)
    }
});


//GET
router.get("/:id", async (req, res) => {
    try {
        const Inventory = await inventory_model.findById(req.params.id);
        res.status(200).json(Inventory);
    } catch (err) {
        res.status(500).json(err)
    }
});


//GET ALL
router.get("/", async (req, res) => {
    try {
        const Inventorys = await inventory_model.find();
        res.status(200).json(Inventorys);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;