const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

let notes = [];

app.get('/api/notes', (req,res)=>{
    res.status(200).json({
        message:'notes fetched',
        notes:notes,
    })
})

app.get('/api/notes/:id',(req,res)=>{
    const id = req.params.id;
    const note = notes.find((note)=>note.id==Number(id));

    if(!note){
        return res.status(404).json({
            error: 'Note not found',
        })
    }
    res.status(200).json({
        message:'note found',
        note:note,
    })

})

app.post('/api/notes',(req,res)=>{
    const {title , content }=req.body;

    if(!title || !content){
        return res.status(400).json({
            message:'title and content are required',
        })
    }

    const newNote ={
        id:notes.length? notes[notes.length -1].id + 1 : 1,
        title : title , 
        content:content,
        createdAt: new Date().toISOString().split('T')[0],
    }

    notes.push(newNote);
    res.status(201).json({
        message:"notes created successfully",
        note:newNote
    })
})

app.put('/api/notes/:id',(req,res)=>{
    const id =req.params.id;

    const note = notes.find((note)=>note.id===Number(id));

    if(!note){
        return res.status(404).json({
            error: 'Note not found',
        })
    }

    const {title,content}=req.body;

    if (!title && !content) {
        return res.status(400).json({
            message: "title or content is required",
        })
    }

    if(title) note.title=title;
    if(content ) note.content=content;

    res.status(200).json({
        message:"updated successfully",
        note:note
    })


})


app.delete('/api/notes/:id',(req,res)=>{
    const id = req.params.id;

    const oldLength = notes.length;

    notes = notes.filter((note)=>note.id !== Number(id));

    if(notes.length === oldLength){
        return res.status(404).json({
            error: 'Note not found',
        })
    }

    res.status(200).json({
        message:"note deleted successfully",
    })
})

module.exports = app;
