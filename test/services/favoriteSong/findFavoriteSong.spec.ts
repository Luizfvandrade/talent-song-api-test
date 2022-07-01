jest.mock('../../../src/database/prismaClient');

import db from '../../../src/database/prismaClient';

import { findFavoriteSong } from '../../../src/services/favoriteSong/index';

describe('findFavoriteSong function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findFavoriteSong).toBeDefined();
  });

  it('should findFavoriteSong call the update findMany from prima client', async () => {
    const mockedUserId = {
      'userId': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
    };

    const mockedQueryParams = {
      'songName': 'testSong',
      'artist': 'testArtist',
      'album': 'testAlbum'
    };

    const mockedResult = [{
      'id': 'b64ad65c-96e1-4be3-8b7b-ecba01603bbf',
      'userId': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'songName': 'testSong',
      'artist': 'testArtist',
      'album': 'testAlbum'
    }];

    (db.favoriteSongs.findMany as any).mockResolvedValue(mockedResult);

    await findFavoriteSong({ ...mockedUserId, ...mockedQueryParams });

    expect(db.favoriteSongs.findMany).toBeCalledWith({
      where: {
        userId: {
          equals: mockedUserId.userId,
        },
        songName: {
          equals: mockedQueryParams.songName,
          mode: 'insensitive',
        },
        artist: {
          equals: mockedQueryParams.artist,
          mode: 'insensitive',
        },
        album: {
          equals: mockedQueryParams.album,
          mode: 'insensitive',
        },
      }
    });
  });
});
