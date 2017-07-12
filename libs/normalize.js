import { schema, normalize } from 'normalizr';

export { normalize };
export const usersSchema = new schema.Entity('users');
export const organizationsSchema = new schema.Entity('organizations');
export const reposSchema = new schema.Entity('repos', {
  owner: usersSchema,
  organization: organizationsSchema,
});
