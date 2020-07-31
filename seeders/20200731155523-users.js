'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      
    await queryInterface.bulkInsert('users', [
    {
      username: 'DanGelok',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'MicahPeterson',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'CainanBarboza',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'RJEppenger',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
