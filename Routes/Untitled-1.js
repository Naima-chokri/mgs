router.post("/add", async (req, res) => {
    try {
      const existProduct = Person.findOne({ name: req.body.name });
      console.log(req.body.name)
      if (existProduct) {
        res.status(400).send({ msg: "person exist" });
      } else {
        const newPerson = new Person({
          ...req.body, //imed qst without {} we put jsut req.body
        });
      }
  
      await newPerson.save(); //all communication in DB we need to put await
  
      res.send({ msg: "person added" });
    } catch (error) {
      console.log(error);
    }
  });
  router.post('/add', async function (req, res) {
    try {
        const existProduct = await Product.findOne({ name: req.body.name }) 
        if(existProduct){
            res.status(400).send({"msg" : "product exist"})
        }else {
            const newProduct = new Product({
            ...req.body
        })
        await newProduct.save()
        res.send({msg : "product added"})
        }
    
    } catch (error) {
        console.log(error)
    }
})
