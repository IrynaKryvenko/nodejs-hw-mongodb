import { Router } from 'express';
import { getContactsController, getContactByIdConroller, createContactController, deleteContactController, upsertContactController, patchContactController } from '../controllers/contacts.js'; 
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getContactsController));


router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdConroller));

router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(deleteContactController));

router.put('/contacts/:contactId', validateBody(createContactSchema), ctrlWrapper(upsertContactController));

router.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));


export default router;