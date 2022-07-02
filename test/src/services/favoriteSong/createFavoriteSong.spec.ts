jest.mock('../../../src/database/prismaClient');

import db from '../../../src/database/prismaClient';

import { createFavoriteSong } from '../../../src/services/favoriteSong/index';

describe('createFavoriteSong function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createFavoriteSong).toBeDefined();
  });

  it('should createFavoriteSong call the create method from prima client', async () => {
    const mockedBody = {
      'userId': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
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

    (db.favoriteSongs.create as any).mockResolvedValue(mockedResult);

    await createFavoriteSong(mockedBody);

    expect(db.favoriteSongs.create).toBeCalledWith({ data: { ...mockedBody } });
  });
});
