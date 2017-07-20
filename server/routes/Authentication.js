const User = require('../models/UserModel');
const utils = require('../../tools/utils')

module.exports = (router) => {

    router.post('/register', (req, res) => {
        if(!req.body.name) {
            res.json( utils.getInsuccessResponse('You must provide a name') );
        }
        else if(!req.body.email) {
            res.json( utils.getInsuccessResponse('You must provide an e-mail') );
        }
        else if(!req.body.username) {
            res.json( utils.getInsuccessResponse('You must provide an username') );
        }
        else if(!req.body.password) {
            res.json( utils.getInsuccessResponse('You must provide a password'));
        }
        else {
            let user = new User({
                  name: req.body.name
                , email: req.body.email.toLowerCase()
                , username: req.body.username.toLowerCase()
                , password: req.body.password 
            });

            user.save((err) => {
                if(err) {
                    // Erro originado pelo unique: true
                    if(err.code == 11000) {
                        res.json( utils.getInsuccessResponse('Username or email already in use'));
                    }
                    // Erros especificos
                    else if(err.errors) {
                        if(err.errors.email) {
                            res.json( utils.getInsuccessResponse(err.errors.email.message));
                        }
                        else if(err.errors.username) {
                            res.json( utils.getInsuccessResponse(err.errors.username.message));
                        }
                        else {
                            res.json( utils.getInsuccessResponse('Could not save user. Error: ' + err));
                        }
                    }
                    // Outros erros
                    else {
                        res.json( utils.getInsuccessResponse('Could not save user. Error: ' + err));
                    }
                }
                // Sucesso
                else {
                    res.json( utils.getSuccessResponse('User successfully registered!'));
                }
            });
        }
    });

    router.get('/checkEmail/:email', (req,res) => {
        if(!req.params.email) {
            res.json( utils.getInsuccessResponse('E-mail was not provided'));
        }
        else {
            User.findOne({ email: req.params.email }, (err, user) => {
                if(err) {
                    res.json( utils.getInsuccessResponse(err));
                }
                else if (user) {
                    res.json( utils.getInsuccessResponse('Email is already taken!'));
                }
                else {
                    res.json( utils.getSuccessResponse('Email is available'));
                }
            })
        }
    });

    router.get('/checkUsername/:username', (req,res) => {
        if(!req.params.username) {
            res.json( utils.getInsuccessResponse('Username was not provided'));
        }
        else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if(err) {
                    res.json( utils.getInsuccessResponse(err));
                }
                else if (user) {
                    res.json( utils.getInsuccessResponse('Username is already taken!'));
                }
                else {
                    res.json( utils.getSuccessResponse('Username is available'));
                }
            })
        }
    });

    return router;
}
