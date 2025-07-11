const express = require('express');
const {createTodo} = require("./types");
const { updateTodo } = require('./types');
const {todo} = require("./db");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

// body{
// title: string,
// description: string}

app.post("/todos", async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (! parsedPayload.success){
        res.status(411).json({
            msg:"You sent the wrong input"
        })

        return

    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "Todo Created"
    })


    
});

app.get("/todos", async function(req,res){
    const todos = await todo.find({}); 
    res.json({todos})

})

app.put("/completed", async function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success){
        res.status(411).json({
            msg:"You sent the wrong input"
        })
        return ;
    }

    await todo.update({      // take to args what and what change 
        _id : req.body.id     // issko update karna hai 
    },{
        completed : true
    })
    res.json({
        msg: "Todo marked as completed"
    })
})

app.listen(3000);