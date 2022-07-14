const express = require("express");
const Person = require("../models/Person");

const router = express.Router(); //we need it when we work in an independent file (we don't need it if we word directly in the server.js)

//---------------------------------------
// Create and Save a Record of a Model:
//---------------------------------------
router.post('/add', async function (req, res) {
  try {
      // const existPerson = await Person.findOne({ name: req.body.name }) 
      // if(existPerson){
      //     res.status(400).send({"msg" : "person exist"})
      // }else {
      //     const newPerson = new Person({
      //     ...req.body
      // })
      // await newPerson.save()
      // res.send({msg : "person added"})
      // }
      const newPerson = new Person({
            ...req.body
        })
        await newPerson.save()
        res.send({msg : "person added"})
  } catch (error) {
      console.log(error)
  }
})
//---------------------------------------
// Create Many Records with model.create()
//---------------------------------------
router.post('/addMany', async function (req,res){
  try {
    await Person.create(req.body)
    res.status(200).send({msg : "persons added"})
  }catch (error) {
    console.log(error)
  }
  });
//---------------------------------------
//Use model.find() to Search Your Database
//---------------------------------------
router.get("/findPerson", async (req, res) => {
  try {
    const findPerson = await Person.find({"name" : req.body.name});
    res.send(findPerson);
  } catch (error) {
    console.log(error);
  }
});
//---------------------------------------
//Use model.findOne() to Return a Single Matching Document from Your Database
//---------------------------------------
router.get("/favoritesFood", async (req, res) => {
  try {
    const findPerson = await Person.find({"favoriteFoods" : req.body.favoriteFoods});
    res.send(findPerson);
  } catch (error) {
    console.log(error);
  }
});
//---------------------------------------
//Use model.findById() to Search Your Database By _id
//---------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const onePerson = await Person.findOne({ _id: req.params.id });
    res.send(onePerson);
  } catch (error) {
    console.log(error);
  }
});
//---------------------------------------
//Perform Classic Updates by Running Find, Edit, then Save
//---------------------------------------
router.post('/update/:id', async function (req, res) {
  const variable ="hamburger";
  await Person.update({ _id: req.params.id }, {$push: {favoriteFoods : variable }}).exec()
  res.status(200).send({msg : "hamburger added"})
})
//---------------------------------------
//Perform New Updates on a Document Using model.findOneAndUpdate()
//---------------------------------------
router.get("/", async (req, res) => {
  try {
    const onePerson = await Person.findOneAndUpdate({ name: req.body.name } , { $set: { age: 20 }} , { new: true })
    res.send(onePerson);
  } catch (error) {
    console.log(error);
  }
});
//---------------------------------------
//Delete One Document Using model.findByIdAndRemove
//---------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const existPerson = await Person.findOne({ _id: req.params.id }) 
    if (existPerson === null) {
      return res.status(400).send({ msg: "person already deleted" });
    }
    const result = await Person.findByIdAndRemove({ _id: req.params.id });
    res.send({ msg: "person successfully deleted" });
  } catch (error) {
    console.log(error);
  }
});
//---------------------------------------
//MongoDB and Mongoose - Delete Many Documents with model.remove()
//---------------------------------------
router.delete("/", async (req, res) => {
  try {
    const result = await Person.remove({ name: req.body.name })
    res.send({ msg: "persons successfully deleted" });
  } catch (error) {
    console.log(error);
  }
});
//---------------------------------------
//Chain Search Query Helpers to Narrow Search Results
//---------------------------------------
router.get("/search", async (req, res) => {
  try {
    //console.log(req.query.favoriteFoods)
    const searchPerson = await Person.find({"favoriteFoods" : {$in : req.query.favoriteFoods}}).sort({name:1}).limit(2).select("-age").exec();
    res.send(searchPerson);
  } catch (error) {
    console.log(error);
  }
});


// const user1 = {name:"", age:00}; // schema
// const user2 = {name:"monir", age:20};
// const update = {...user1, ...user2}
// const user1 = [{name:"mourad", age:30}, {name:"ali", age:30}];
// const user2 = [{name:"mourad", age:30}];
// const update = [...user1, ...user2]
// console.log(update)




module.exports = router;
