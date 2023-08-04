const {Schema,model} = require('mongoose');

const TaskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    creationDate: {type: Date, default: Date.now}
});

module.exports = model('Task', TaskSchema);