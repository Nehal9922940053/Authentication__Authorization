
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');
const UserModel = require('./models/User');
const PokemonModel = require('./models/pokemons');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ['GET','POST'],
    credentials:true
}));
app.use(cookieParser());

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology:true},)
.then(()=> {
    console.log('Connect Successfully')
})

.catch((err) => {
    console.error(err)
})


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//  app.use(express.static('./uploads'));

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json("The token was not available")
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err) return res.json("Token is wrong")
            next();
        })
    }
}


app.get('/',verifyUser,(req, res) =>{
    return res.json("Success")
})


app.post('/login', (req,res) => {
     const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user =>{
        if(user){
        bcrypt.compare(password, user.password, (err,response) => {
            if(response){
                const token = jwt.sign({email:user.email}, "jwt-secret-key" , {expiresIn:"1d"})
                res.cookie("token", token)
                res.json("Success")
            }else{
                res.json("The password is incorrect")   
            }
        })
    }else{
        res.json("No record existed")
    }
    })
})
    //     if(user){
    //         if(user.password === password){
    //             res.json("Success")
    //         }else{
    //             res.json("the password is incorrect")
    //         }
    //     }else{
    //         res.json("No record existed")
    //     }
    // })
//})

app.post('/signup', (req,res) => {
    const {username,email,password} = req.body;
    bcrypt.hash(password ,10)
    .then(hash =>{
        UserModel.create({username,email, password:hash})
        .then(users => res.json(users))
        .catch( err => res.json(err))
    }).catch(err => console.log(err.message))

    })



//image upload
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    },
});

const upload = multer({storage});


//Insert an movie into database route
app.post('/create',upload.single('image'), async(req,res) => {
try{
    const {pokemon_id,name,type} = req.body;
    const imagePath = req.file.path; 

 const newPokemon = new PokemonModel({
        pokemon_id,
        name,
        type,
        imagePath
    });
    await newPokemon.save();

    res.json({message: 'Pokemon added successfully'});
} catch(error) {
    res.json({error:error.message});
}
});
    // app.post('/create', (req,res) => {
    //     PokemonModel.create(req.body)
    //     .then(pokemons => res.json(pokemons))
    //     .catch( err => res.json(err))
    // })


app.get('/getpokemon', (req, res) => {
    PokemonModel.find()
    .then(pokemons => res.json(pokemons))
    .catch(err => res.json(err))
  });



  app.get('/pokemon_detail/:id',(req, res,next) =>{
    console.log("test");
   console.log(req.params.id);

   PokemonModel.findOne({pokemon_id:req.params.id})
   .then(result => {
    res.status(200).json({
        pokemons: result
    })
    console.log(result);
    // res.json(pokemons);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({
        error:err
    })
   })
  });


//   app.get('/getpokemon/:id', (req, res) => {
//     PokemonModel.findById(req.params)
//     .then(pokemons => res.json(pokemons))
//     .catch(err => res.json(err))
//   });





// app.get('/getpokemon/:id', async (req, res) => {
//     try { 
//     const pokemons = await pokemons.findOne(req.params.pokemon_id);
//       res.json(pokemons);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });
  
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({ status:"Success"});
})

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
});