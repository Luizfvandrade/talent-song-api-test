import db from "../../database/prismaClient";

interface IUpdateFavoriteSong {
  id: string
  songName?: string
  artist?: string
  album?: string
}

async function updateFavoriteSong({ id, songName, artist, album }: IUpdateFavoriteSong) {
  const favoriteSongUpdated = await db.favoriteSongs.update({
    where: {
      id,
    },
    data: {
      songName,
      artist,
      album,
    }
  })

  return favoriteSongUpdated
}

export { updateFavoriteSong };
