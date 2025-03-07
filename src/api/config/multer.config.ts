import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads', //? Upload-Ordner
        filename: (req, file, callback) =>
        {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, uniqueSuffix + extname(file.originalname));
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, //! Max. 5 MB pro Datei
    
};