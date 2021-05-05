const { response } = require('express');
const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const adminAuth = require("../middlewares/adminAuth");

router.get('/admin/articles', adminAuth, (request, response) => {
    Article.findAll({
        include: [{model: Category, required: true}] // Incluindo na busca o model category
    }).then(articles => {
        response.render('admin/articles/index', {articles: articles});
    });
});

router.get('/admin/articles/new', adminAuth, (request, response) => {
    Category.findAll().then(categories => {
    response.render('admin/articles/new', {categories: categories});
    });
});

router.post('/articles/save', (request, response) =>{
    const title = request.body.title;
    const body = request.body.body;
    const category = request.body.category;

    Article.create({
        title: title,
        slug: slug(title),
        body: body,
        categoriaId: category
    }).then(() => {
        response.redirect('/admin/articles');
    })
});

router.post('/articles/delete', (request, response) => {
    const id = request.body.id;
    if(id != undefined) {
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                response.redirect('/admin/articles');
            }).catch(err => {
                console.log(err);
            });
        } else {
            response.redirect('/admin/articles');
        }
    } else {
        response.redirect('/admin/articles')
    }
});

router.get('/admin/articles/edit/:id', (request, response) => {
    const id = request.params.id;
    Article.findByPk(id).then(article => {
        if(article != null){
            Category.findAll().then(categories => {
                response.render('admin/articles/edit', {article: article, categories: categories});
            })
        } else {
            response.redirect('/');
        }
    }).catch(err => {
        response.redirect('/');
    })
});

router.post('/articles/update', (request, response) => {
    const id = request.body.id;
    const title = request.body.title;
    const body = request.body.body;
    const category = request.body.category;

    Article.update({title: title, body: body, categoriaId: category, slug: slug(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        response.redirect('/admin/articles');
    }).catch(err => {
        response.redirect('/');
    });

});

router.get('/articles/page/:num', (request, response) => {
    const page = request.params.num;
    let offset = 0;
    if(isNaN(page) || page == 1){
        offset = 0;
    } else {
        offset = (parseInt(page) -1) * 2;
    }
    Article.findAndCountAll({limit: 2, offset: offset}).then(articles => {
        let next;

        if(offset + 2 >= articles.count){
            next = false;
        } else {
            next = true;
        }

        let result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            response.render('admin/articles/page', {result: result, categories: categories})
        });
    }); // quantos elementos existem nessa tabela
});


function slug(slug) {
    const slugFormated = slug.replace(" ", "-").toLowerCase();
    return slugFormated;
};


module.exports = router;