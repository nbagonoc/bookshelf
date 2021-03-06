const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { Auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))

// GET
// user profile
app.get('/api/auth',Auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
})

//user logout
app.get('/api/logout',Auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

// get book
app.get('/api/getBook',(req,res)=>{
    let id = req.query.id;

    Book.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    });

});
// get books
app.get('/api/books',(req,res)=>{
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    // domain/api/books?skip=0&limit=5&order=asc
    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.send(doc)
    })

})
// get reviewer
app.get('/api/getReviewer',(req,res)=>{
    let id = req.query.id;
    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.send({
            name: doc.name,
            lastname: doc.lastname
        })
    })
})
// get users
app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(users)
    })
})
// get user post
app.get('/api/userPost',(req,res)=>{
    Book.find({ownerId:req.query.user}).find((err,docs)=>{
        if(err) return res.status(400).send(err)
        res.send(docs)
    })
})


// POST
// book
app.post('/api/book',(req,res)=>{
    const book =  new Book(req.body);
    
    // save a book
    book.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            bookId:doc._id
        })
    })

})

// user

// register user
app.post('/api/registerUser',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false})
        res.status(200).json({
            success:true,
            user:doc
        })
    })

})
// login user
app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'user not found'})
        
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong Password'
            })
            
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err)
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

// UPDATE
app.patch('/api/updateBook',(req,res)=>{
    // update a book
    Book.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.json({
            success:true,
            doc
        })
    })
})

// DELETE
app.delete('/api/deleteBook',(req,res)=>{
    let id = req.query.id;
    // delete a book
    Book.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true);
    });
});

// for production
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`server running`);
});