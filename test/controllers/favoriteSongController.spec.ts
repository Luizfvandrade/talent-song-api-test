jest.mock('../../src/services/favoriteSong/index');

import { FavoriteSongController } from '../../src/controllers/favoriteSongController';

import { createFavoriteSong, findFavoriteSong, updateFavoriteSong, deleteFavoriteSong } from '../../src/services/favoriteSong/index';

const mockedResponse: any = {
  json: jest.fn().mockImplementation((result) => {
    jest.fn().mockReturnValue(result);
  }),
  status: jest.fn(() => mockedResponse),
  locals: { userId: 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba' },
};

const mockedResult = {
  'id': 'b64ad65c-96e1-4be3-8b7b-ecba01603bbf',
  'userId': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
  'songName': 'testSong',
  'artist': 'testArtist',
  'album': 'testAlbum'
};

describe('FavoriteSongController', () => {
  let favoriteSongController: FavoriteSongController;

  beforeEach(() => {
    favoriteSongController = new FavoriteSongController();

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(favoriteSongController).toBeDefined();
  });

  describe('successful', () => {
    it('should called favorite song create function', async () => {
      const mockedRequest: any = {
        body: {
          'songName': 'testSong',
          'artist': 'testArtist',
          'album': 'testAlbum'
        }
      };

      (createFavoriteSong as any).mockResolvedValue(mockedResult);

      await favoriteSongController.save(mockedRequest, mockedResponse);

      expect(createFavoriteSong).toHaveBeenCalledWith({ ...mockedRequest.body, ...mockedResponse.locals });
      expect(mockedResponse.json).toHaveBeenCalledWith(mockedResult);
      expect(mockedResponse.status).toHaveBeenCalledWith(201);
    });

    it('should called favorite song find function', async () => {
      const mockedRequest: any = {
        query: {
          'songName': 'testSong',
          'artist': 'testArtist',
          'album': 'testAlbum'
        }
      };

      (findFavoriteSong as any).mockResolvedValue(mockedResult);

      await favoriteSongController.find(mockedRequest, mockedResponse);

      expect(findFavoriteSong).toHaveBeenCalledWith({ ...mockedRequest.query, ...mockedResponse.locals });
      expect(mockedResponse.json).toHaveBeenCalledWith(mockedResult);
      expect(mockedResponse.status).toHaveBeenCalledWith(200);
    });

    it('should called favorite song update function', async () => {
      const mockedRequest: any = {
        body: {
          'songName': 'testSong',
          'artist': 'testArtist',
          'album': 'testAlbum'
        },
        params: {
          'id': 'b64ad65c-96e1-4be3-8b7b-ecba01603bbf',
        }
      };

      (updateFavoriteSong as any).mockResolvedValue(mockedResult);

      await favoriteSongController.update(mockedRequest, mockedResponse);

      expect(updateFavoriteSong).toHaveBeenCalledWith({ ...mockedRequest.body, ...mockedRequest.params });
      expect(mockedResponse.json).toHaveBeenCalledWith({ ...mockedResult });
      expect(mockedResponse.status).toHaveBeenCalledWith(200);
    });

    it('should called favorite song delete function', async () => {
      const mockedRequest: any = {
        params: {
          'id': 'b64ad65c-96e1-4be3-8b7b-ecba01603bbf',
        }
      };

      (updateFavoriteSong as any).mockResolvedValue();

      await favoriteSongController.delete(mockedRequest, mockedResponse);

      expect(deleteFavoriteSong).toHaveBeenCalledWith(mockedRequest.params.id);
      expect(mockedResponse.status).toHaveBeenCalledWith(204);
    });
  });
});
