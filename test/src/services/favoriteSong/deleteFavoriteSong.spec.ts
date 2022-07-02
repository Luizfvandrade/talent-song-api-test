jest.mock('../../../src/database/prismaClient');

import db from '../../../src/database/prismaClient';

import { deleteFavoriteSong } from '../../../src/services/favoriteSong/index';

describe('deleteFavoriteSong function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(deleteFavoriteSong).toBeDefined();
  });

  it('should deleteFavoriteSong call the delete method from prima client', async () => {
    const mockedId = 'b64ad65c-96e1-4be3-8b7b-ecba01603bbf';

    (db.favoriteSongs.delete as any).mockResolvedValue();

    await deleteFavoriteSong(mockedId);

    expect(db.favoriteSongs.delete).toBeCalledWith({ where: { id: mockedId } });
  });
});
