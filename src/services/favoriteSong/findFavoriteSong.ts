import db from '../../database/prismaClient';

interface IFindFavoriteSong {
  userId: string
  songName?: string
  artist?: string
  album?: string
}

async function findFavoriteSong({ userId, songName, artist, album }: IFindFavoriteSong) {
  const favoriteSong = await db.favoriteSongs.findMany({
    where: {
      userId: {
        equals: userId,
      },
      songName: {
        equals: songName,
        mode: 'insensitive',
      },
      artist: {
        equals: artist,
        mode: 'insensitive',
      },
      album: {
        equals: album,
        mode: 'insensitive',
      },
    }
  });

  return favoriteSong;
}

export { findFavoriteSong };
