var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/main');
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
var paymentProc = require('./services/paymentprocessing');
var payloadProc = require('./services/payloadprocessing');
var async = require('async');
var utils = require('./services/utils');

// specify express to use the body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(cors({
    allowedHeaders : ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization']
}));

// connect to Mongoose
mongoose.connect(config.database);
var db = mongoose.connection;

// include models
Cuenta = require('./models/cuenta');
Frecuencia = require('./models/frecuencia');
User = require('./models/user');
Afiliado = require('./models/afiliado');
Anotacion = require('./models/anotacion');

require('./config/passport')(passport);

// create API group routes
var apiRoutes = express.Router();

/* POSTS */

apiRoutes.post('/login', 
  function(req, res) {

    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            throw err;
        }
        
        if (!user) {
            res.send({ success: false, message: 'Autenticacion fallida. El usuario ' + req.body.username + ' no existe.'});
        }
        else {
            User.comparePassword(req.body.password, user.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user, config.secret, { expiresIn: 2880 });
                    res.json({ userId: user._id, userMetadata: { name: user.name, email: user.email }, success: true, token: 'JWT ' + token });
                }
                else {
                    res.send({ success: false, message: 'Autenticacion fallida. La contrasena es invalida.'});
                }
            });
        }
    });
});

// add annotation
apiRoutes.post('/anotaciones', passport.authenticate('jwt', { session: false }), function(req, res) {
    var anotacion = req.body;
    
    Anotacion.addAnotacion(anotacion, function(err, anotacion) {
       if (err) {
            throw err;  
       } 
       else {
           res.json({ success: true, payload: anotacion});
       }
    });
});

// get initial package
apiRoutes.get('/initialPackage', passport.authenticate('jwt', { session: false }), function(req, res, next) {
   var userId = req.query.userid;
  
    payloadProc.processInitialPackage(userId, function(err, _payload) {
        if (err) {
            res.send({ success: false, message: 'Hubo un problema empacando la informacion. Tratar de nuevo.'});
        }
        else {
            res.json({ success: true, payload: _payload });
        }
    });
});

// get all payments to be made, as a list of affiliates
apiRoutes.get('/pagos', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    //by afiliado id
   if (req.query.afiliadoId) {
        payloadProc.processAfiliadoAndPayments(req.query.afiliadoId, function(err, payload) {
            if (err) {
                    res.send({ success: false, message: 'Hubo un problema buscando el afiliado y sus pagos relacionados. Trate de nuevo.'}); 
                } 
                else {
                    res.json({ success: true, payload: payload });
                }
        });
   }
   else {
        paymentProc.processAllAfiliadosToPay(function(err, afiliadosAPagar) {
            if (err) {
                res.send({ success: false, message: 'Hubo un problema procesando los afiliados a pagar. Tratar de nuevo.'});
            }
            else {
                res.json({ success: true, payload: afiliadosAPagar });
            } 
        });
   }
});

// post a payment
apiRoutes.post('/pagos', passport.authenticate('jwt', { session: false }), function(req, res) {
    
    var payments = req.body.pagos;
    var type = req.body.paymentType;
    
    switch(type) {
        case "abonoPayment":
        paymentProc.processAbonoPayments(payments, function(err, abonoPayments) {
            if (err) {
                console.log(err);
                    res.json({ success: false, message: 'Hubo un problema abonando pagos. Trate de nuevo.'});
            } 
            else {
                res.json({ success: true, payload: abonoPayments});
            }
        });
        break;
        case "advancedPayment":
        paymentProc.processUserAdvancedPayments(payments, function(err, insertedPayments) {
            if (err) {
                console.log(err);
                    res.json({ success: false, message: 'Hubo un problema añadiendo los pagos. Trate de nuevo.'});
            } 
            else {
                res.json({ success: true, payload: insertedPayments});
            }
        });
        break;
    }
});

// get all annotations, and if a userid is provided, get those annotations from that user
apiRoutes.get('/anotaciones', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    //by cedula
   if (req.query.userid) {
        Anotacion.getAnotacionesFromUser(req.query.userid, { created: 'desc'}, function(err, anotaciones) {
            if (err) {
                    res.send({ success: false, message: 'Hubo un problema buscando el afiliado por la cedula. Trate de nuevo.'}); 
                } 
                else {
                    res.json({ success: true, payload: anotaciones });
                }
        });
   }
   else {
       Anotacion.getAnotaciones({ created: 'desc'}, 10, function(err, anotaciones) {
            if (err) {
                    res.send({ success: false, message: 'Hubo un problema buscando el afiliado por la cedula. Trate de nuevo.'}); 
                } 
                else {
                    res.json({ success: true, payload: anotaciones });
                }
        });
   }
});

// get a single afilado: by cedula, id. etc.
apiRoutes.get('/afiliados', passport.authenticate('jwt', { session: false }), function(req, res) {
   //by cedula
   if (req.query.cedula) {
        Afiliado.getAfiliadoByCedula(req.query.cedula, function(err, afiliado) {
            if (err) {
                    res.send({ success: false, message: 'Hubo un problema buscando el afiliado por la cedula. Trate de nuevo.'}); 
                } 
                else {
                    res.json({ success: true, payload: afiliado });
                }
        });
   }
   // byid
   else if (req.query.id) {
        Afiliado.getAfiliadoById(req.query.id, function(err, afiliado) {
            if (err) {
                    res.send({ success: false, message: 'Hubo un problema buscando el afiliado por id. Trate de nuevo.'}); 
                } 
                else {
                    res.json({ success: true, payload: afiliado });
                }
        });
   }
   else {
       Afiliado.getAfiliadosList(function(err, afiliados) {
            if (err) {
                res.send({ success: false, message: 'Hubo un problema buscando los afiliados. Trate de nuevo.'}); 
            } 
            else {
                res.json({ success: true, payload: afiliados });
            }
        });
   }
});

// add affiliate
apiRoutes.post('/afiliados', passport.authenticate('jwt', { session: false }), function(req, res) {
    var afiliado = req.body;
    afiliado.cuenta.estado = "Activa";
    afiliado.ultimoAccesso = new Date();
    afiliado.creado = new Date();
    
    Afiliado.addAfiliado(afiliado, function(err, createdAfiliado) {
       if (err) {
           console.log(err);
            res.json({ success: false, message: 'Hubo un problema añadiendo afiliado. Trate de nuevo.'});
       } 
       else {
           res.json({ success: true, payload: createdAfiliado});
       }
    });
});

// add a relative to an affiliate
apiRoutes.post('/familiares', passport.authenticate('jwt', { session: false }), function(req, res) {
    var familiarPackage = req.body;
    
    var familiarModel = familiarPackage.familiar;
    familiarModel._id = utils.generateGuid();
    var afiliadoId = familiarPackage.afiliadoId;
    
    Afiliado.addFamiliarToAfiliado(afiliadoId, familiarModel, function(err, createdFamiliar) {
       if (err) {
           console.log(err);
           res.json({ success: false, message: 'Hubo un problema añadiendo familiar al afiliado. Trate de nuevo.'}); 
       } 
       else {
           res.json({ success: true, payload: createdFamiliar});
       }
    });
});

// delete
apiRoutes.delete('/anotaciones/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    var id = req.params.id;
    
    Anotacion.deleteAnotacion(id, function(err, anotacion) {
       if (err) {
            throw err;  
       } 
       else {
           res.json({ success: true, payload: anotacion });
       }
    });
});

apiRoutes.get('/logout', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    req.logout();
    res.json({ success: true, message: 'you are logged out!'});
});

apiRoutes.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    
    var newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password
    });
    
    User.createUser(newUser, function(err, user) {
        if (err) {
            throw err;
        }
        else {
            console.log('Registered User:' + user);
            res.json(user);
        }
        
    });
});

app.use('/api', apiRoutes);

var server = app.listen(5000, function() {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Listening on http://%s:%s", host, port); 
});