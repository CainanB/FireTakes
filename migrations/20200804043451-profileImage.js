'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     
     await queryInterface.addColumn(
       'users',
        'profileImage',
     
     { type: Sequelize.STRING }
     
     );
     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'users',
       'profileImage',
    
    { type: Sequelize.INTEGER }
    
    );
  }
};
