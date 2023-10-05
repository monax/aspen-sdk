import { UUIDFromString } from '@monaxlabs/phloem/dist/types';
import * as t from 'io-ts';

export const ALL_USER_ORGS = 'ALL_USER_ORGS';

export const OrganizationsScope = t.union([t.keyof({ [ALL_USER_ORGS]: null }), t.array(UUIDFromString)]);

export type OrganizationsScope = t.TypeOf<typeof OrganizationsScope>;

export const AuthorizedScopes = t.type({
  organizations: OrganizationsScope,
});

export type AuthorizedScopes = t.TypeOf<typeof AuthorizedScopes>;

export const allUserOrganizationsScope = { organizations: ALL_USER_ORGS } satisfies AuthorizedScopes;
