import db from '../../database/prismaClient';

interface ICreateFavoriteSong {
  userId: string
  songName: string
  artist: string
  album: string
}

async function createFavoriteSong({ userId, songName, artist, album }: ICreateFavoriteSong) {
  const song = await db.favoriteSongs.create({
    data: {
      userId,
      songName,
      artist,
      album,
    }
  });

  return song;
}

export { createFavoriteSong };
