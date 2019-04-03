// ToDo app controller code
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

// Connect to MongoDB database hosted on MongoDB Atlas
mongoose.connect('mongodb+srv://woody:pOq3c0NQTjc3SFDL@cluster0-kbesh.gcp.mongodb.net/test?retryWrites=true', {useNewUrlParser: true });
// Create DB schema
// Data format example: {item: "Buy milk"}
var todoSchema = new mongoose.Schema({
  item: String
});
// Create DB model
var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {
  // Handle GET requests to get data from the DB and pass it to the view
  app.get("/todo", function(req, res) {
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });   
  });
  // Handle POST requests to get data from the view and add it to the DB
  app.post("/todo", urlencodedParser, function(req, res) {
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  // Handle DELETE requests to delete item from DB
  app.delete("/todo/:item", function(req, res) {
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
};
