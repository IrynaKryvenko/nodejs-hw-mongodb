import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { registerUserSchema,
        requestResetEmailSchema,
        loginUserSchema,
       resetPasswordSchema
       } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
   resetPasswordController,
  requestResetEmailController
} from '../controllers/auth.js';




const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUsersSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));


router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
export default router;