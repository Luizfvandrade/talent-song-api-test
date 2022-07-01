jest.mock('../../../src/database/prismaClient');

import db from '../../../src/database/prismaClient';

import { updateFavoriteSong } from '../../../src/services/favoriteSong/index';

describe('updateFavoriteSong function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(updateFavoriteSong).toBeDefined();
  });

  it('should updateFavoriteSong call the update method from prima client', async () => {
    const mockedId = {
      'id': 'b64ad65c-96e1-4be3-8b7b-ecba01603bbf',
    };

    const mockedQueryParams = {
      'songName': 'testSong',
      'artist': 'testArtist',
      'album': 'testAlbum'
    };

    const mockedResult = {
      'id': 'b64ad65c-96e1-4be3-8b7b-ecba01603bbf',
      'userId': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'songName': 'testSong',
      'artist': 'testArtist',
      'album': 'testAlbum'
    };

    (db.favoriteSongs.update as any).mockResolvedValue(mockedResult);

    await updateFavoriteSong({ ...mockedId, ...mockedQueryParams });

    expect(db.favoriteSongs.update).toBeCalledWith({
      where: {
        ...mockedId
      },
      data: {
        ...mockedQueryParams,
      }
    });
  });
});
