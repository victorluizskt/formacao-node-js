const express = require('express');
const router = express.Router();
const Category = require('./Category');

router.get('/categories', (request, response) => {
    response.send('Router categories');
});

router.get('/admin/categories/new', (request, response) => {
    response.render('admin/categories/new');
});

router.post('/categories/save', (request, response) => {
    const title = request.body.title;
    if(title != undefined) {
        Category.create({
            title: title,
            slug: slug(title),
        }).then(() => {
            response.redirect('/admin/categories')
        }).catch((err) => {
            throw err;
        });
    } else {
        response.redirect('/admin/categories/new');
    };
});

router.get('/admin/categories', (request, response) => {
    Category.findAll().then(categories => {
        response.render('admin/categories/index', {categories: categories});
    });
});

router.post('/categories/delete', (request, response) => {
    const id = request.body.id;
    if(id != undefined) {
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                response.redirect('/admin/categories');
            }).catch(err => {
                console.log(err);
            });
        } else {
            response.redirect('/admin/categories');
        }
    } else {
        response.redirect('/admin/categories')
    }
});

router.get('/admin/categories/edit/:id', (request, response) => {
    const id = request.params.id;

    if(isNaN(id)){
        response.redirect('/admin/categories');
    }

    Category.findByPk(id).then(category =>{
        if(category != undefined){
            response.render('admin/categories/edit', {category: category});
        } else {
            response.redirect('/admin/categories');
        }
    }).catch(err => {
        response.redirect('/admin/categories');
    })
});

// Atualizar categoria
router.post('/categories/update', (request, response) => {
    const id = request.body.id;
    const title = request.body.title;

    Category.update({title: title, slug: slug(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        response.redirect('/admin/categories');
    }).catch(err => {
        response.redirect('/admin/categories');
    });
});

router.get('/documentation', (request, response) => {
    response.render('documentation/index')
});

function slug(slug) {
    const slugFormated = slug.replace(" ", "-").toLowerCase();
    return slugFormated;
};

module.exports = router;
