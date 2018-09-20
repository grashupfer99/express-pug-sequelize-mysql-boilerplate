'use strict';
module.exports = (sequelize, DataTypes) => {
  const reply = sequelize.define('reply', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  reply.associate = (models) => {
    reply.belongsTo(models.post, { // reply.belongsTo() 에서 reply 가 post 에 속해 있다
      foreignKey: "postId"
    })
  };
  
  return reply;
};