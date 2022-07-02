import { Prisma } from '@prisma/client';
import {
  Request,
  Response,
} from 'express';

import {
  createFavoriteSong,
  findFavoriteSong,
  updateFavoriteSong,
  deleteFavoriteSong,
} from '../services/favoriteSong';

class FavoriteSongController {
  async save(req: Request, res: Response) {
    const { songName, artist, album } = req.body;
    const { userId } = res.locals;

    const result = await createFavoriteSong({ userId, songName, artist, album });

    return res.status(201).json(result);
  }

  async find(req: Request, res: Response) {
    const { userId } = res.locals;

    const result = await findFavoriteSong({ ...req.query, userId });

    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { songName, artist, album } = req.body;

    const result = await updateFavoriteSong({ id, songName, artist, album });

    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await deleteFavoriteSong(id);

    return res.status(204).json();
  }
}

export { FavoriteSongController };
