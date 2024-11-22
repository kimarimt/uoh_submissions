import axios from 'axios';

const baseUrl = '/api/contacts';

const getAllContacts = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const createContact = async (contactObject) => {
  const request = axios.post(baseUrl, contactObject);
  const response = await request;
  return response.data;
};

const updateContact = async (id, newContactObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newContactObject);
  const response = await request;
  return response.data;
};

const deleteContact = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

export default {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};
