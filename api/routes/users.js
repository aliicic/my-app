const { Router } = require("express");

const bcrypt = require('bcryptjs')

const User = require('../models/user')

const router = Router();

const jwt = require("jsonwebtoken")


// Mock Users
//const users = [{ name: "Alexandre" }, { name: "Pooya" }, { name: "Sébastien" }];

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.json(users);
// });

router.post('/register', async (req, res) => {
    console.log('yes it works');
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const result = await user.save();

      const { password, ...data } = await result.toJSON();

      res.send(data);

})

router.post("/login", async (req, res) => {
    console.log(req.body.password , 'this is password');
  
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).json({ message: "user not found" })

     bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
       if (err) console.log(err);
       if (!isMatch) return res.status(422).json({ msg: "invalid password"});

       const token = jwt.sign({ id: user._id }, "secret");

       res.cookie("jwt", token, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
         sameSite: "strict",
         secure: process.env.NODE_ENV === "production" ? true : false,
       });
       res.json({
         message: "success",
       });
     });
       

})

router.get("/list", async (req, res) => {
    try {
    
        const cookie = req.cookies['jwt'] 

    const claims = jwt.verify(cookie, 'secret' )
    if (!claims) return res.status(401).json({
        message : 'auth failed'
    })
    const user = await User.findOne({ _id: claims.id })

        const { password, ...data } = await user.toJSON();
         
      //  res.json({ data, user :'ali'});
    res.json({ user :  data });


    }catch (e) {
        return res.status(401).json({
        message : 'auth failed'
    })
    }
    
})

router.post("/logout", async (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 }) 
    res.json({
        message : 'logged out'
    })
})

/* GET user by ID. */
router.get("/users/:id", function (req, res, next) {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
