import db from '../../database/prismaClient';

function deleteFavoriteSong(id: string) {
  return db.favoriteSongs.delete({
    where: {
      id
    }
  });
}

export { deleteFavoriteSong };
