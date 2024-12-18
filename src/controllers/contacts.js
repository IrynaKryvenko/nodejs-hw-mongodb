import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
} from '../services/contacts.js';

import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactsController = async (req, res) => {
    if (!req.user || !req.user._id) {
        throw createHttpError(401, 'User not authenticated');
    }
    
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    try {
        const result = await getAllContacts({ page, perPage, sortBy, sortOrder, userId: req.user._id });
        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts',
            data: result,
        });
    } catch (error) {
        console.error('Error in getContactsController:', error); // Логирование ошибки
        throw createHttpError(500, 'Internal Server Error');
    }
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;

    if (!req.user || !req.user._id) {
        throw createHttpError(401, 'User not authenticated');
    }

    try {
        const contact = await getContactById(contactId, req.user._id);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (error) {
        console.error('Error in getContactByIdController:', error); // Логирование ошибки
        throw createHttpError(500, 'Internal Server Error');
    }
};

export const createContactController = async (req, res) => {
    if (!req.user || !req.user._id) {
        throw createHttpError(401, 'User not authenticated');
    }

    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    const newContact = {
        name,
        phoneNumber,
        email,
        isFavourite,
        contactType,
        userId: req.user._id,
    };

    try {
        const contact = await createContact(newContact);

        res.status(201).json({
            status: 201,
            message: 'Successfully created a contact!',
            data: contact,
        });
    } catch (error) {
        console.error('Error in createContactController:', error); // Логирование ошибки
        throw createHttpError(500, 'Internal Server Error');
    }
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;

    if (!req.user || !req.user._id) {
        throw createHttpError(401, 'User not authenticated');
    }

    try {
        const contact = await deleteContact(contactId, req.user._id);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error in deleteContactController:', error); // Логирование ошибки
        throw createHttpError(500, 'Internal Server Error');
    }
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!req.user || !req.user._id) {
        throw createHttpError(401, 'User not authenticated');
    }

    const updatedContact = { name, phoneNumber, email, isFavourite, contactType };

    try {
        const contact = await updateContact(contactId, updatedContact, req.user._id);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully patched a contact!',
            data: contact,
        });
    } catch (error) {
        console.error('Error in patchContactController:', error); // Логирование ошибки
        throw createHttpError(500, 'Internal Server Error');
    }
};
