import { parseEntityRef } from '@backstage/catalog-model';
import { identityApiRef, useApi } from '@backstage/core-plugin-api';
import useAsync from 'react-use/esm/useAsync';

const capitalise = (s?: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : undefined;

export interface CurrentUser {
  /** Profile display name, else the entity name, else undefined while loading. */
  displayName?: string;
  /** First word of `displayName`, for greetings. */
  firstName?: string;
  email?: string;
  picture?: string;
  userEntityRef?: string;
}

/**
 * The signed-in user, resolved from the identity API. Shared by the nav rail's
 * user card and the landing page greeting so they never disagree about who is
 * signed in (or fetch it twice as differently as they used to).
 */
export function useCurrentUser(): CurrentUser {
  const identityApi = useApi(identityApiRef);
  const { value } = useAsync(
    async () => ({
      profile: await identityApi.getProfileInfo(),
      identity: await identityApi.getBackstageIdentity(),
    }),
    [identityApi],
  );

  const profile = value?.profile;
  const userEntityRef = value?.identity.userEntityRef;
  const entityName = userEntityRef
    ? parseEntityRef(userEntityRef).name
    : undefined;
  const displayName = profile?.displayName ?? capitalise(entityName);

  return {
    displayName,
    firstName: capitalise(displayName?.split(/\s+/)[0]),
    email: profile?.email,
    picture: profile?.picture,
    userEntityRef,
  };
}
