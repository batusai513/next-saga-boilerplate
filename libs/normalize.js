import { schema, normalize as _normalize } from 'normalizr';
import parseResponse from './parseResponse';

export const normalize = (response, _schema) => _normalize(parseResponse(response), _schema);
export const moviesSchema = new schema.Entity('movies');
export const moviesArraySchema = [moviesSchema];
export const usersSchema = new schema.Entity('users');
export const organizationsSchema = new schema.Entity('organizations');
export const reposSchema = new schema.Entity('repos', {
  owner: usersSchema,
  organization: organizationsSchema,
});
