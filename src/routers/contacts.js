import { Router } from 'express';
import { getContactsController, getContactByIdConroller, createContactController, deleteContactController, upsertContactController, patchContactController } from '../controllers/contacts.js'; 
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const router = Router();
router.get('/contacts', ctrlWrapper(getContactsController));


router.get('/contacts/:contactId', ctrlWrapper(getContactByIdConroller));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));


export default router;