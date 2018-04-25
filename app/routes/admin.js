module.exports = function(application) {
    application.get('/formulario_inclusao_noticia', function(req, res){
        res.render("admin/form_add_noticia", {validacao : {}, validacao : {} });
    });
    
    application.post('/noticias/salvar', function(req, res){
        var noticia = req.body;

        req.assert('titulo','Titulo obrigatório').notEmpty();
        req.assert('resumo','Resumo obrigatório').notEmpty();
        req.assert('resumo','Resumo deve ter entre 10 e 100 caracteres').len(10,100);
        req.assert('autor','Autor obrigatório').notEmpty();
        req.assert('data_noticia','Data obrigatória').notEmpty();
        req.assert('noticia','Noticia obrigatório').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.render("admin/form_add_noticia", { validacao : erros, noticia : noticia } );
            return;
        }
        
        var connection = application.config.dbConnection();
        var noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia , function(error, result){

            res.redirect('/noticias');
            //res.render('noticias/noticias', { noticias : result });
        });

    });
};