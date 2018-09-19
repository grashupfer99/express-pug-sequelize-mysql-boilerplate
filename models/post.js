'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  post.associate = (models) => {
    post.hasMany(models.reply); // post.hasNamy() 는 post 가 reply 들을 가지고 있다
  }

  return post;
};