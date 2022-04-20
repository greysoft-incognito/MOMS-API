import { Request, Response } from 'express';
import config from '../../config/config';

const docs = (req: Request, res: Response) => {
  res.redirect(<string>config.docs);
};

export default docs;
