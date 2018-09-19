const express = require('express');
const models = require('../models');
const router = express.Router();

// 라우터
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
});

// Read
router.get('/lists', (req, res) => {
  models.post.findAll()
    .then(result => {
      res.render('lists', {
        posts: result
      });
    });
});

// Create
router.post('/create', (req, res) => {
  let body = req.body;

  console.log(body)
  models.post.create({
      title: body.inputTitle, // a(db): b(browser)
      writer: body.inputWriter
    })
    .then(result => {
      console.log("> Completed saving data");
      res.redirect('lists');
    })
    .catch(err => {
      console.log("> Failed saving data");
    });
});

// Update
router.get('/edit/:id', (req, res) => {
  let postID = req.params.id;

  models.post.find({
      where: {
        id: postID
      }
    })
    .then(result => {
      res.render('edit', {
        post: result
      });
    })
    .catch(err => {
      console.log("> Failed checking data");
    });
});
router.put('/update/:id', (req, res) => {
  let postID = req.params.id;
  let body = req.body;

  models.post.update({
      title: body.editTitle,
      writer: body.editWriter
    }, {
      where: {
        id: postID
      }
    })
    .then(result => {
      console.log("> Completed modifying data");
      res.redirect('/lists')
    })
    .catch(err => {
      console.log("> Failed modifying data");
    });
});

// Delete
router.delete('/delete/:id', (req, res) => {
  let postID = req.params.id;

  models.post.destroy({
      where: {
        id: postID
      } // where 작성 안하면 모든 데이터가 삭제됨
    })
    .then(result => {
      res.redirect('/lists');
    })
    .catch(err => {
      console.log("> Failed deleting data");
    })
});

// 댓글
router.post('/reply/:id', (req, res) => {
  let postID = req.params.id;
  let body = req.body;

  models.reply.create({
      posttId: postID, // a(db):b(browser)
      writer: body.replyWriter,
      content: body.replyContent
    })
    .then(results => { // 복수형으로 사용
      console.log('> Succeeded writing comment');
      res.redirect('/lists')
      console.log(results)
      console.log('--------')
    })
    .catch(err => {
      console.log('> Failed writing comment');
      console.log(err)
    });
});

module.exports = router;