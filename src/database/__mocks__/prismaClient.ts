const prisma = {
  favoriteSongs: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  users: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

export default prisma;
