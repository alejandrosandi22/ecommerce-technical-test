'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: 25,
        name: 'Gazelle Messi Shoes',
        description:
          "Show some Messi style. These adidas Gazelle football shoes flash the GOAT's iconic logo on the heel and a Trefoil on the tongue.",
        price: 79.5,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749830528090-Gazelle_Messi_Shoes_Pink_IH8156_01_standard_hover.avif?alt=media&token=9b6d2720-a80c-4aab-9287-eacc0704eb22',
        createdAt: new Date('2025-06-13T16:02:09.645Z'),
        updatedAt: new Date('2025-06-13T16:02:09.645Z'),
      },
      {
        id: 26,
        name: 'Shorts Estro 19',
        description:
          'Prepárate para el partido. Muévete y controla el balón con estos shorts de fútbol adidas Estro. Livianos y absorbentes, mantienen tu piel seca en todo momento en la cancha.',
        price: 7.89,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749838917725-FT6686_01_laydown.avif?alt=media&token=cf133ab6-9d44-4a4e-b39a-f61f1190d2a8',
        createdAt: new Date('2025-06-13T18:21:58.808Z'),
        updatedAt: new Date('2025-06-13T18:21:58.808Z'),
      },
      {
        id: 27,
        name: 'Camiseta Own The Run',
        description:
          'Esta camiseta de running adidas mantiene tu cuerpo fresco desde el primer paso hasta el último. El tejido AEROREADY absorbe el sudor para ayudar a mantener tu cuerpo seco. ',
        price: 24.99,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749838976476-IN2961_01_laydown.avif?alt=media&token=d87ba9e0-4eb5-41a4-ae56-bc1a02a1211c',
        createdAt: new Date('2025-06-13T18:22:57.568Z'),
        updatedAt: new Date('2025-06-13T18:22:57.568Z'),
      },
      {
        id: 28,
        name: 'Tenis Duramo RC',
        description:
          'Corre un poco más rápido. Corre un poco más lejos. Estos tenis de running adidas ofrecen ligereza, suavidad y sujeción para que puedas dar el siguiente paso en tu carrera. ',
        price: 25.98,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749839045815-ID2709_HM1.avif?alt=media&token=7dff54c2-7a2b-4fc6-a445-151156fcf27c',
        createdAt: new Date('2025-06-13T18:24:07.410Z'),
        updatedAt: new Date('2025-06-13T18:24:07.410Z'),
      },
      {
        id: 29,
        name: 'Chaqueta Adicolor Classics Firebird',
        description:
          'Un look clásico con el toque distintivo de Adicolor. Esta prenda esencial luce el icónico estilo Firebird pero con un corte moderno y una paleta de colores actual.',
        price: 62,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749839144306-IJ7058_01_laydown.avif?alt=media&token=754a8a82-0672-459e-81d9-5be40de8bdd8',
        createdAt: new Date('2025-06-13T18:25:45.247Z'),
        updatedAt: new Date('2025-06-13T18:25:45.247Z'),
      },
      {
        id: 30,
        name: 'Chaqueta Adicolor Classics Firebird',
        description:
          'Un look clásico con el toque distintivo de Adicolor. Esta prenda esencial luce el icónico estilo Firebird pero con un corte moderno y una paleta de colores actual.',
        price: 26.88,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749839191726-JP2543_01_laydown.avif?alt=media&token=18c6fe09-aa05-4822-bfe8-fefbf80400c8',
        createdAt: new Date('2025-06-13T18:26:32.693Z'),
        updatedAt: new Date('2025-06-13T18:26:32.693Z'),
      },
      {
        id: 32,
        name: 'Predator League Fold-Over Tongue Firm/Multi-Ground Boots',
        description:
          'Discover the difference between aiming to score and knowing you will with adidas Predator boots that are crafted for goals.',
        price: 139,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749845722526-Predator_League.avif?alt=media&token=73af4801-4b6a-4579-9171-76b634b03629',
        createdAt: new Date('2025-06-13T20:14:41.756Z'),
        updatedAt: new Date('2025-06-13T20:15:23.405Z'),
      },
      {
        id: 33,
        name: 'Tiro 24 Competition Training Top',
        description:
          "Practise makes perfect in this adidas training top. Part of the Tiro 24 Competition range, it'll help power you through intense on-field preparation.",
        price: 79,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749845776247-Tiro_24.avif?alt=media&token=f5c43637-c009-424d-bd3d-bbd5023d911f',
        createdAt: new Date('2025-06-13T20:16:17.493Z'),
        updatedAt: new Date('2025-06-13T20:16:17.493Z'),
      },
      {
        id: 34,
        name: 'FC Bayern 24/25 Third Jersey',
        description:
          "Clean and classic, this FC Bayern third jersey combines treasured elements from the club's DNA and adidas heritage.",
        price: 80.5,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749845842471-FC_Bayern_24-25.avif?alt=media&token=b438e37b-e55c-4458-884a-8b0ea3ae4cf6',
        createdAt: new Date('2025-06-13T20:17:23.627Z'),
        updatedAt: new Date('2025-06-13T20:17:23.627Z'),
      },
      {
        id: 23,
        name: 'CAMISETA LOCAL NIÑO FCRF 24',
        description:
          'EL ARTE DE UN PATRIMONIO DE LA HUMANIDAD PLASMADO EN LA PIEL DE LOS TICOS. La carreta, símbolo de cultura y arte, es la inspiración para este modelo fresco e innovador, representante de la cultura de la paz, el trabajo y el afán por alcanzar las metas.',
        price: 59,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749826513703-JK0019_01_laydown.png?alt=media&token=9f59b736-a0a3-40b3-a260-c2ac169e668d',
        createdAt: new Date('2025-06-13T14:55:15.456Z'),
        updatedAt: new Date('2025-06-13T14:55:15.456Z'),
      },
      {
        id: 24,
        name: 'Camiseta Future Icons 3 Rayas',
        description:
          'Hazte notar con un diseño sencillo. Esta camiseta adidas de algodón suave luce las 3 Rayas de la parte frontal a la espalda, lo que le confiere un look audaz a la prenda.',
        price: 49.99,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749830382482-JJ4159_01_laydown.avif?alt=media&token=237ed29b-4d15-4c78-8533-2fb40eb2ee4d',
        createdAt: new Date('2025-06-13T15:59:43.896Z'),
        updatedAt: new Date('2025-06-13T15:59:43.896Z'),
      },
      {
        id: 31,
        name: 'Tenis Superstar II x Minecraft Niños',
        description:
          'Estos tenis adidas Superstar para jóvenes con estilo le agregan estampados inspirados en el universo de Minecraft a un modelo icónico del básquet. ',
        price: 19.65,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749839288118-JQ8749_01_02_standard.avif?alt=media&token=0004bedf-4ca7-4e47-bfec-720a074c181c',
        createdAt: new Date('2025-06-13T18:28:09.619Z'),
        updatedAt: new Date('2025-06-13T20:10:43.093Z'),
      },
      {
        id: 35,
        name: 'Predator Freestyle Indoor Boots',
        description:
          "Go into every game knowing you'll score in adidas Predator Freestyle boots crafted for goals.",
        price: 149,
        image:
          'https://firebasestorage.googleapis.com/v0/b/e-commerce-tech-task.firebasestorage.app/o/images%2Fproducts%2F1749845914564-Predator_Freestyle.avif?alt=media&token=af55d77c-09a5-46c4-9d92-f66876361dd5',
        createdAt: new Date('2025-06-13T20:18:35.494Z'),
        updatedAt: new Date('2025-06-13T20:18:35.494Z'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', {
      id: {
        [Sequelize.Op.in]: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
      },
    });
  },
};
