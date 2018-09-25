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
  models.post.findAll().then(result => {
    let loopIndex = 0
    for(let post of result) {
      models.post.find({
        include: {model: models.reply, where: {postId: post.id}} // include 는 관계설정, 조건부여 역할. postId 는 여기서 외래키이며, 이 키와 관련있는 models.reply 를 조회한다
      }).then(result2 => {
        if(result2) {
          post.replies = result2.replies
        } // 중간에 posts 테이블의 id 값이 비어있으면 result2 에는 undefined 가 할당된다. 그래서 이 경우를 해결하기 위해 작성된 코드다. 
        loopIndex++
        if(loopIndex === result.length) { // 이 코드때문에 posts 테이블이 비어있으면 렌더링이 안되는 것 같음
          // TODO: 빈 테이블에도 렌더링 되도록 해결해야함
          res.render('lists', {
            posts: result, // a(view engine): b(javascript)) 
          });
        } else if(loopIndex === undefined) {
          res.render('lists')          
        }
      }); // then() 밖에 있으면 비동기로 출력돼서 렌더링이 이뤄지지 않는다
    }
  });
});

// Create
router.post('/create', (req, res) => {
  let body = req.body;

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
        id: postID // a(db); b(javascript)
      }
    })
    .then(result => {
      res.render('edit', {
        post: result // a(browser): b(javascript)
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
      title: body.editTitle, // a(db): b(browser)
      writer: body.editWriter
    }, {
      where: {
        id: postID // a(db): b(javascript)
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
        id: postID // a(db): b(javascript)
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
router.post('/reply/:postID', (req, res) => {
  let postID = req.params.postID;
  let body = req.body;

  models.reply.create({
      postId: postID, // a(db):b(javascript, browser)
      writer: body.replyWriter,
      content: body.replyContent
    })
    .then(results => { // 복수형으로 사용
      console.log('> Succeeded writing comment');
      res.redirect('/lists');
    })
    .catch(err => {
      console.log('> Failed writing comment');
      console.log(err)
    });
});

module.exports = router;