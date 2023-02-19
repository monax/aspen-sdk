import { BigNumber, BigNumberish } from 'ethers';
import * as stream from 'stream';
import * as gen from './generated';
import {
  CancelablePromise,
  FileResponse,
  FileType,
  MerkleProofResponse,
  OpenAPI,
  UserTermsResponse,
} from './generated';
import { request as __request } from './generated/core/request';

// Sensible default
OpenAPI.BASE = 'https://publishing.aspenft.io';

const probablyNode = typeof process !== 'undefined';

gen.CollectionService.postCollectionFiles = ({
  guid,
  index,
  formData,
}: {
  guid: string;
  index: number;
  formData?: {
    file: Blob;
    fileType: FileType;
  };
}): CancelablePromise<FileResponse> => {
  return __request(OpenAPI, {
    method: 'POST',
    url: '/collection/{guid}/files/{index}',
    path: {
      guid: guid,
      index: index,
    },
    formData: probablyNode ? undefined : formData,
    body: probablyNode ? formData : undefined,
    mediaType: 'multipart/form-data',
    errors: {
      401: `Unauthorized`,
      404: `Not Found`,
    },
  });
};

gen.CollectionService.postCollectionTerms = ({
  guid,
  formData,
}: {
  guid: string;
  formData?: {
    file?: Blob;
  };
}): CancelablePromise<UserTermsResponse> => {
  const ret = __request<UserTermsResponse>(OpenAPI, {
    method: 'POST',
    url: '/collection/{guid}/terms',
    path: {
      guid: guid,
    },
    formData: probablyNode ? undefined : formData,
    body: probablyNode ? formData : undefined,
    mediaType: 'multipart/form-data',
    errors: {
      400: `Bad Request`,
      401: `Unauthorized`,
      404: `Not Found`,
    },
  });
  return ret;
};
gen.UtilityService.postUtilityFiles = ({
  formData,
}: {
  formData?: {
    file?: Blob | stream.Readable;
  };
}): CancelablePromise<string> => {
  return __request(OpenAPI, {
    method: 'POST',
    url: '/Utility/Files',
    formData: probablyNode ? undefined : formData,
    body: probablyNode ? formData : undefined,
    mediaType: 'multipart/form-data',
  });
};

export type AllowlistStatus =
  | {
      status: 'included';
      proofs: string[];
      proofMaxQuantityPerTransaction: number;
    }
  | {
      status: 'excluded';
      proofs: [];
      proofMaxQuantityPerTransaction: 0;
    }
  | {
      status: 'no-active-phase';
      proofs: [];
      proofMaxQuantityPerTransaction: 0;
    }
  | {
      status: 'no-allowlist';
      proofs: [];
      proofMaxQuantityPerTransaction: 0;
    };

export async function getAllowlistStatus(
  contractAddress: string,
  walletAddress: string,
  chain: gen.Chain,
  tokenId: BigNumberish | null = null,
): Promise<AllowlistStatus> {
  // Ugh. This goes away.
  const noActivePhaseBodyText = 'Phase not found';

  const { proofs, proofMaxQuantityPerTransaction, err }: MerkleProofResponse & { err?: any } =
    await gen.ContractService.getMerkleProofsFromContract({
      contractAddress,
      walletAddress,
      chainName: chain,
      tokenId: tokenId ? BigNumber.from(tokenId).toNumber() : undefined,
    }).catch((err) => ({
      err,
      proofs: [],
      proofMaxQuantityPerTransaction: 0,
    }));

  if (err) {
    // Handle some 404s as non-error states
    if (err.status === 404) {
      if (err.body === noActivePhaseBodyText) {
        return { status: 'no-active-phase', proofs: [], proofMaxQuantityPerTransaction: 0 };
      }
      return { status: 'excluded', proofs: [], proofMaxQuantityPerTransaction: 0 };
    }

    // Throw other errors
    throw err;
  }

  if (!(proofs && proofs.length) || !proofMaxQuantityPerTransaction) {
    return { status: 'excluded', proofs: [], proofMaxQuantityPerTransaction: 0 };
  }

  return { status: 'included', proofs, proofMaxQuantityPerTransaction };
}
export * from './generated';
