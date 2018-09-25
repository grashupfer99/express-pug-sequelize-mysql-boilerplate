expressJS + sequelize + pug 게시판
====

# Stack


# Structure
```shell
│  index.js
├─bin
│      www
├─config
│      config.json
│      dev.json
├─migrations
│      20180919034317-create-post.js
│      20180919062843-create-reply.js
│      20180923033909-create-user.js
├─models
│      index.js
│      post.js
│      reply.js
│      user.js
├─public
│  ├─images
│  ├─javascripts
│  └─stylesheets
│          style.css
├─routes
│      index.js
├─seeders
│      20180923033933-test.js
└─views
        edit.pug
        error.pug
        index.pug
        layout.pug
        lists.pug

```

# Scripts
* ```start```
* ```start:dev```