import { Prisma } from '@prisma/client';
import db from '../../database/prismaClient';

async function createFavoriteSong({ userId, songName, artist, album }: Prisma.FavoriteSongsCreateManyInput) {
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
