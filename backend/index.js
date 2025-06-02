const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { type } = require('os');
const {nanoid} = require('nanoid');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://DivijaLakshmi:Divija%402005@cluster0.kvqupp3.mongodb.net/Shortify')
.then(()=>console.log("MongoDB Connected"))
.catch(err => console.log("/MongoDB Error:",err))


const Urls = mongoose.model('Urls',{
    originalUrl:{
        type:String,
        required:true,
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    }
})

app.post('/shorten', async (req,res)=>{
    const {originalUrl} = req.body;
    if(!originalUrl){
        return res.status(400).json({error:"originalUrl is required"})
    }
    try{
    const shortCode = nanoid(7);
    const newUrl = new Urls({
        originalUrl,
        shortUrl:shortCode
    });
    await newUrl.save();

    res.status(201).json({
        message:"Short URL created successfully",
        shortUrl: `http://localhost:4000/${shortCode}`
    });
} catch(error){
    res.status(500).json({error:"Something went wrong", details:error.message});
}
});

app.get('/:shortUrl', async (req,res)=>{
    const {shortUrl} = req.params;

    try{
        const urlDoc = await Urls.findOne({shortUrl});
        if(urlDoc){
            return res.redirect(urlDoc.originalUrl);
        }
        else{
            return res.status(404).json({error:"Short URL not found"})
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Server Error"});
    }
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port);
    }
    else{
        console.log("Error: "+error);
    }
})
