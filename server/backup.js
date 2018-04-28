var obj = { name: "Roman", lastname : "Jaquez", payments: []};

var server = app.listen(3000, function() {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Listening on http://%s:%s", host, port); 
});

var url = "mongodb://localhost:27017/clients";
MongoClient.connect(url, function(err, db) {
    
    if (!err) {
        console.log('We are connected!');
    }
    
    var clientProfiles = db.collection('clientprofiles');
    
    var j = schedule.scheduleJob('*/1 * * * *', function(){
    //obj.payments.push({ amount: 50, owed: 50, total: 100 });
        clientProfiles.updateMany({}, { $push: { payments: { amount: 50, owed: 50, total: 100 }}}, function(err, added) {
            
        });
    });
    
    app.get('/', function(req, res) {
        
        clientProfiles.find().toArray(function(err, response) {
            console.log(response);
            res.json(response);
        });
    });
});

/* endpoints */

apiRoutes.get('/genres', passport.authenticate('jwt', { session: false }), function(req, res) {
    Genre.getGenres(function(err, genres) {
       if (err) {
            throw err;  
       } 
       else {
           res.json({ success: true, payload: genres });
       }
    });
});

apiRoutes.get('/genres/:_id', passport.authenticate('jwt', { session: false }), function(req, res) {
    Genre.getGenreById(req.params._id, function(err, genre) {
       if (err) {
            throw err;  
       } 
       else {
           res.json(genre);
       }
    });
});

apiRoutes.get('/books', passport.authenticate('jwt', { session: false }), function(req, res) {
    Book.getBooks(function(err, books) {
       if (err) {
            throw err;  
       } 
       else {
           res.json(books);
       }
    });
});

apiRoutes.get('/books/:_id', passport.authenticate('jwt', { session: false }), function(req, res) {
    Book.getBookById(req.params._id, function(err, book) {
       if (err) {
            throw err;  
       } 
       else {
           res.json(book);
       }
    });
});

apiRoutes.get('/registeredusers', passport.authenticate('jwt', { session: false }), function(req, res) {
    User.getRegisteredUsers(function(err, users) {
       if (err) {
            throw err;  
       } 
       else {
           res.json(users);
       }
    });
});

apiRoutes.post('/books', function(req, res) {
    var book = req.body;
    
    Book.addBook(book, function(err, book) {
       if (err) {
            throw err;  
       } 
       else {
           res.json(book);
       }
    });
});

apiRoutes.post('/genres', function(req, res) {
    var genre = req.body;
    
    Genre.addGenre(genre, function(err, genre) {
       if (err) {
            throw err;  
       } 
       else {
           res.json({ success: true, payload: genre });
       }
    });
});

/* UPDATES */

apiRoutes.put('/genres/:_id', function(req, res) {
    var id = req.params._id;
    var genre = req.body;
    
    Genre.updateGenre(id, genre, {}, function(err, genre) {
       if (err) {
            throw err;  
       } 
       else {
           res.json(genre);
       }
    });
});

apiRoutes.put('/books/:_id', function(req, res) {
    var id = req.params._id;
    var book = req.body;
    
    Book.updateBook(id, book, {}, function(err, book) {
       if (err) {
            throw err;  
       } 
       else {
           res.json(book);
       }
    });
});

/* DELETE */

apiRoutes.delete('/genres/:_id', function(req, res) {
    var id = req.params._id;
    
    Genre.deleteGenre(id, function(err, genre) {
       if (err) {
            throw err;  
       } 
       else {
           res.json(genre);
       }
    });
});

apiRoutes.delete('/books/:_id', function(req, res) {
    var id = req.params._id;
    
    Book.deleteBook(id, function(err, book) {
       if (err) {
            throw err;  
       } 
       else {
           res.json(book);
       }
    });
});