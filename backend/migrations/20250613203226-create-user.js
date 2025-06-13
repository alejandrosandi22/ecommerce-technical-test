'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 4,
          username: 'admin',
          email: 'admin@email.com',
          password:
            '$2b$08$KreUmLa6fvBV4F6uxEPOu.2tJmacSbTvnv6Rvtpo.HlsHiBJ1YJTS',
          role: 'admin',
          createdAt: new Date('2025-06-13T12:16:12.849-06:00'),
          updatedAt: new Date('2025-06-13T12:16:12.849-06:00'),
        },
        {
          id: 5,
          username: 'user',
          email: 'user@email.com',
          password:
            '$2b$08$EFr.yEMj2c7aUBle8TKET.Tqcin4GLT1IKUZ97275VFzmMmjLDu1.',
          role: 'user',
          createdAt: new Date('2025-06-13T12:16:55.065-06:00'),
          updatedAt: new Date('2025-06-13T12:16:55.065-06:00'),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'users',
      {
        id: { [Sequelize.Op.in]: [4, 5] },
      },
      {},
    );
  },
};
