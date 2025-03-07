import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import { extname } from 'path';

export const multerConfig: MulterOptions = {
    storage: multer.diskStorage({
        destination: './uploads', //! Speichert Dateien im "uploads"-Ordner
        filename: (req, file, cb) =>
        {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, //! Maximal 5MB pro Datei
};