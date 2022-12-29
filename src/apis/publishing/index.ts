import * as stream from 'stream';
import * as gen from './generated';
import { CancelablePromise, FileResponse, FileType, OpenAPI, UserTermsResponse } from './generated';
import { request as __request } from './generated/core/request';

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

export * from './generated';
