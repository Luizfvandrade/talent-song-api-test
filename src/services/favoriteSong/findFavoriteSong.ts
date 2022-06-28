import { Prisma } from '@prisma/client';
import db from '../../database/prismaClient';

async function findFavoriteSong({ userId, songName, artist, album }: Prisma.FavoriteSongsCreateManyInput) {
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
