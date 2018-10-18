'use strict';
// TODO: migrate 에러 해결하기
// ERROR: Unknown column 'password' in 'field list'

module.exports = {
  up: (queryInterface, Sequelize) => { // seed 를 생성할떄 수행할 로직
    let datas = []
    for(let i = 0; i < 10; i++) {
      let obj = {
        email: "test" + i + "@example.com",
        name: "testUser" + i,
        password: "1234",
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      datas.push(obj)
    }
    return queryInterface.bulkInsert('users', datas, {}); // bulkInsert() 메서드의 첫번째 인자는 객체 이름이 아닌, 테이블의 이름을 전달해야함
  },

  down: (queryInterface, Sequelize) => { // seed 를 되돌릴때 수행할 로직
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
