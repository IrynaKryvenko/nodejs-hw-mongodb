import { Router } from 'express';
import { getContactsController, getContactByIdConroller, createContactController, deleteContactController, upsertContactController, patchContactController } from '../controllers/contacts.js'; 
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();
router.get('/', ctrlWrapper(getContactsController));


router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdConroller));

router.post('/register', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/:contactId', validateBody(updateContactSchema), ctrlWrapper(deleteContactController));

router.put('/:contactId', validateBody(createContactSchema), ctrlWrapper(upsertContactController));

router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));


export default router;