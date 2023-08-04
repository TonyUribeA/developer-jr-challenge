const {Router} = require('express');
const router = Router();

const Task = require('../models/Task');

router.get('/', async (req,res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post('/', async (req,res)=>{
    const {title, description, creationDate} = req.body;
    const newTask = new Task({title, description, creationDate})
    await newTask.save();
    res.json({message: 'Task Saved'});
})

router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    console.log(task);
    res.json({message: 'Task Deleted'});
})

module.exports = router;