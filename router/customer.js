//const asyncMiddleware = require("../middleware/async");

const { Customer, validate } = require("../model/customers");
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

//router.get("/another", (req, res, next) => {});

/*router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const customer = await Customer.find();
    res.send(customer);
  })
);*/

router.get("/", async (req, res) => {
//  throw new Error("could not find customers");
  const customer = await Customer.find();
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    location: req.body.location,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      location: req.body.location,
    },
    { new: true }
  );

  if (!customer) return res.status(404).send("id not found...");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) return res.status(404).send("id not found...");
  res.send(customer);
});

router.get("/:id", async (req, res) => {
if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('invalid id')
  
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("id not found...");
  res.send(customer);
});

module.exports = router;
