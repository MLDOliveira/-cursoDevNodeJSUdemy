
var dbConnection = require('../../config/dbConnection');

module.exports = function(app){
    app.get('/noticias', function(req,res){
        
        var connection = dbConnection();
                
        connection.query('SELECT * FROM noticias', function (error, results, fields) {
            res.render('noticias/noticias',{noticias : results});
            //res.send(results);
        });
        
        connection.end();
        
        //res.render('noticias/noticias');
    });
}