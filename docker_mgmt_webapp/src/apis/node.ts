import { CreateRequestPayload } from '@/schema/node';
import { httpClient } from '@/utils/http';

export const fetchNodes = () => {
  return httpClient.get('/api/server');
};

export const createNode = (requestPayload: CreateRequestPayload) => {
  return httpClient.post('/api/server/', requestPayload);
};