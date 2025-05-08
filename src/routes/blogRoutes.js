import { Router } from 'express';

import * as blogController from '../controllers/blogController.js';

const router = Router({ mergeParams: true });

router.route(`/`).post(blogController.newPost);


export default router;
