import { PublishingAPI } from '@monaxlabs/aspen-sdk';
import { waitForSuccess } from './waiter';

const { CollectionActionsService, IssuanceStatus } = PublishingAPI;

export async function issueToken(
  collectionGuid: string,
  issueRequest: PublishingAPI.IssueRequest,
): Promise<{ tokenId: number; issuanceId: number }> {
  const { issuanceId } = await CollectionActionsService.postCollectionIssue({
    guid: collectionGuid,
    requestBody: issueRequest,
  });
  if (issuanceId === undefined || issuanceId === null) {
    throw new Error(`Did not get issuanceId`);
  }
  const { tokenId } = await waitForSuccess(
    { successStatus: IssuanceStatus.ISSUED, errorStatus: IssuanceStatus.ISSUING_ERROR },
    CollectionActionsService.getCollectionIssue,
    { guid: collectionGuid, issuanceId },
  );
  if (tokenId === undefined || tokenId === null) {
    throw new Error(`TokenId missing from issue response. (issuanceId: ${issuanceId}) (this is unexpected).`);
  }
  return { tokenId, issuanceId };
}
