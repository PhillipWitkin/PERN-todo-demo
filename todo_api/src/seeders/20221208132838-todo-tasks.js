'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Tasks', [{
       name: 'Eat',
       completed: true,
     },
     {
      name: "Sleep",
      completed: false,
     },
     {
      name: "Repeat",
      completed: false,
     }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Tasks', null, {});
  }
};
