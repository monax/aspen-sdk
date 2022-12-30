// GENERATED FILE - edits will be lost

export const manifest = {
  'ICedarFeatures.sol:ICedarFeaturesV0': {
    id: 'ICedarFeatures.sol:ICedarFeaturesV0',
    erc165Identifier: '0x03a88048',
    name: 'ICedarFeaturesV0',
    file: 'ICedarFeatures.sol',
    dir: '.',
    family: 'CedarFeatures',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'c9dc51cf93af3eec3fe6c96938ee980c7e869bc76b567e39f4eabd0dcf511721',
  },
  'ICedarVersioned.sol:ICedarImplementationVersionedV0': {
    id: 'ICedarVersioned.sol:ICedarImplementationVersionedV0',
    erc165Identifier: '0x06bfcec6',
    name: 'ICedarImplementationVersionedV0',
    file: 'ICedarVersioned.sol',
    dir: '.',
    family: 'CedarImplementationVersioned',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'db64494d658a52cd2d16339babdd7c483401617146114ffb1c676802605cb284',
  },
  'ICedarVersioned.sol:ICedarImplementationVersionedV1': {
    id: 'ICedarVersioned.sol:ICedarImplementationVersionedV1',
    erc165Identifier: '0x4d3fc8cb',
    name: 'ICedarImplementationVersionedV1',
    file: 'ICedarVersioned.sol',
    dir: '.',
    family: 'CedarImplementationVersioned',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'implementationInterfaceName',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '31fb5d49a121598b7bc8352d0aa016acddab90171910789be10ab033ade35a4c',
  },
  'ICedarVersioned.sol:ICedarImplementationVersionedV2': {
    id: 'ICedarVersioned.sol:ICedarImplementationVersionedV2',
    erc165Identifier: '0x7ee35d14',
    name: 'ICedarImplementationVersionedV2',
    file: 'ICedarVersioned.sol',
    dir: '.',
    family: 'CedarImplementationVersioned',
    version: 2,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'implementationInterfaceId',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceId',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '556566dd0fb45de9ad4b6bdaf069b9a67c50aa9c2dd0e8d5754a5dd974951905',
  },
  'ICedarVersioned.sol:ICedarMinorVersionedV0': {
    id: 'ICedarVersioned.sol:ICedarMinorVersionedV0',
    erc165Identifier: '0x7436f3dc',
    name: 'ICedarMinorVersionedV0',
    file: 'ICedarVersioned.sol',
    dir: '.',
    family: 'CedarMinorVersioned',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '570d4e11d80afbd59c170f3e339112446685ab4c53f0ebe1710412871c48a80e',
  },
  'ICedarVersioned.sol:ICedarVersionedV0': {
    id: 'ICedarVersioned.sol:ICedarVersionedV0',
    erc165Identifier: '0x7376f4bd',
    name: 'ICedarVersionedV0',
    file: 'ICedarVersioned.sol',
    dir: '.',
    family: 'CedarVersioned',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '939ede4a3b716be8f62eb3612634c9743b5277d8a6d27c4ee0e5f6f228f833e0',
  },
  'ICedarVersioned.sol:ICedarVersionedV1': {
    id: 'ICedarVersioned.sol:ICedarVersionedV1',
    erc165Identifier: '0x38f6f2b0',
    name: 'ICedarVersionedV1',
    file: 'ICedarVersioned.sol',
    dir: '.',
    family: 'CedarVersioned',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'implementationInterfaceName',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '74b68ca9510447e0bd769b817beab259dbf8b0eeac9af692936369942f4f4310',
  },
  'ICedarVersioned.sol:ICedarVersionedV2': {
    id: 'ICedarVersioned.sol:ICedarVersionedV2',
    erc165Identifier: '0x0b2a676f',
    name: 'ICedarVersionedV2',
    file: 'ICedarVersioned.sol',
    dir: '.',
    family: 'CedarVersioned',
    version: 2,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'implementationInterfaceId',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceId',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '3fac1530da100b2e735316c2529d40a97157a615e73f88cab24163ddc7af7516',
  },
  'IMulticallable.sol:IMulticallableV0': {
    id: 'IMulticallable.sol:IMulticallableV0',
    erc165Identifier: '0xac9650d8',
    name: 'IMulticallableV0',
    file: 'IMulticallable.sol',
    dir: '.',
    family: 'Multicallable',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'e6f019af6c4dfbdc93ec9e4bce7752ce58c82184cb2220962265adc665e59e38',
  },
  'agreement/IAgreementsRegistry.sol:IAgreementsRegistryV0': {
    id: 'agreement/IAgreementsRegistry.sol:IAgreementsRegistryV0',
    erc165Identifier: '0xbb84d805',
    name: 'IAgreementsRegistryV0',
    file: 'agreement/IAgreementsRegistry.sol',
    dir: 'agreement',
    family: 'AgreementsRegistry',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'acceptor',
            type: 'address',
          },
        ],
        name: 'TermsAccepted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'isActivated',
            type: 'bool',
          },
        ],
        name: 'TermsActivationStatusUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
        ],
        name: 'TermsUpdated',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
        ],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'getTermsDetails',
        outputs: [
          {
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'termsActivated',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: '_termsVersion',
            type: 'uint8',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_active',
            type: 'bool',
          },
        ],
        name: 'setTermsActivation',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_termsURI',
            type: 'string',
          },
        ],
        name: 'setTermsURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '2d6be2307fd8b7d73905331fbc98a440780e6a5e4d7cbdfc5af3f7b6699aa82e',
  },
  'agreement/ICedarAgreement.sol:ICedarAgreementV0': {
    id: 'agreement/ICedarAgreement.sol:ICedarAgreementV0',
    erc165Identifier: '0x389ce04c',
    name: 'ICedarAgreementV0',
    file: 'agreement/ICedarAgreement.sol',
    dir: 'agreement',
    family: 'CedarAgreement',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '2248a879dd796c47d2019f9c95a9523cfcd735d1a161ae49fb53e6553a40fea1',
  },
  'agreement/ICedarAgreement.sol:ICedarAgreementV1': {
    id: 'agreement/ICedarAgreement.sol:ICedarAgreementV1',
    erc165Identifier: '0x7f8ef9f1',
    name: 'ICedarAgreementV1',
    file: 'agreement/ICedarAgreement.sol',
    dir: 'agreement',
    family: 'CedarAgreement',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'acceptor',
            type: 'address',
          },
        ],
        name: 'TermsAccepted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'isActivated',
            type: 'bool',
          },
        ],
        name: 'TermsActivationStatusUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
        ],
        name: 'TermsUpdated',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
        ],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTermsDetails',
        outputs: [
          {
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'termsActivated',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_active',
            type: 'bool',
          },
        ],
        name: 'setTermsActivation',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_termsURI',
            type: 'string',
          },
        ],
        name: 'setTermsURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'adda7217cf21552dd48da6ecec5ce00056282b62cbc4fcbc68c3f94f4bf2283e',
  },
  'agreement/ICedarAgreement.sol:IPublicAgreementV0': {
    id: 'agreement/ICedarAgreement.sol:IPublicAgreementV0',
    erc165Identifier: '0xed9459ea',
    name: 'IPublicAgreementV0',
    file: 'agreement/ICedarAgreement.sol',
    dir: 'agreement',
    family: 'PublicAgreement',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTermsDetails',
        outputs: [
          {
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'termsActivated',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: '_termsVersion',
            type: 'uint8',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '0fb3b4523cd3ffa39d51e3f556d4092946c8611ae9ba5ea0ec41a7d053f4cc16',
  },
  'agreement/ICedarAgreement.sol:IRestrictedAgreementV0': {
    id: 'agreement/ICedarAgreement.sol:IRestrictedAgreementV0',
    erc165Identifier: '0x9a6af375',
    name: 'IRestrictedAgreementV0',
    file: 'agreement/ICedarAgreement.sol',
    dir: 'agreement',
    family: 'RestrictedAgreement',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
        ],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_active',
            type: 'bool',
          },
        ],
        name: 'setTermsActivation',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_termsURI',
            type: 'string',
          },
        ],
        name: 'setTermsURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '50dd9d601b98640f0da588d9dae63fe19459f23734ae1b9ea08a0cde96cc0980',
  },
  'baseURI/ICedarUpdateBaseURI.sol:ICedarUpdateBaseURIV0': {
    id: 'baseURI/ICedarUpdateBaseURI.sol:ICedarUpdateBaseURIV0',
    erc165Identifier: '0x9869a1ef',
    name: 'ICedarUpdateBaseURIV0',
    file: 'baseURI/ICedarUpdateBaseURI.sol',
    dir: 'baseURI',
    family: 'CedarUpdateBaseURI',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '77086586f9410b104fe89d18aa022f0b3998b906883a67456cd2f1c3a30dea93',
  },
  'baseURI/ICedarUpdateBaseURI.sol:IPublicUpdateBaseURIV0': {
    id: 'baseURI/ICedarUpdateBaseURI.sol:IPublicUpdateBaseURIV0',
    erc165Identifier: '0x191b9515',
    name: 'IPublicUpdateBaseURIV0',
    file: 'baseURI/ICedarUpdateBaseURI.sol',
    dir: 'baseURI',
    family: 'PublicUpdateBaseURI',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'ad31eb252b006ad98d9310569643e95cb6b05c4a38478a933c64884a80dcb8dd',
  },
  'baseURI/ICedarUpdateBaseURI.sol:IRestrictedUpdateBaseURIV0': {
    id: 'baseURI/ICedarUpdateBaseURI.sol:IRestrictedUpdateBaseURIV0',
    erc165Identifier: '0x817234fa',
    name: 'IRestrictedUpdateBaseURIV0',
    file: 'baseURI/ICedarUpdateBaseURI.sol',
    dir: 'baseURI',
    family: 'RestrictedUpdateBaseURI',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '320aa6161bb6f87a5b3b1eb88b308f2385a13b1f4bb3f5d5e95e782fec8cc89a',
  },
  'baseURI/ICedarUpgradeBaseURI.sol:ICedarUpgradeBaseURIV0': {
    id: 'baseURI/ICedarUpgradeBaseURI.sol:ICedarUpgradeBaseURIV0',
    erc165Identifier: '0xb2afbdbb',
    name: 'ICedarUpgradeBaseURIV0',
    file: 'baseURI/ICedarUpgradeBaseURI.sol',
    dir: 'baseURI',
    family: 'CedarUpgradeBaseURI',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'upgradeBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '4d5964caf67a52d969bed7f6f915c90e76632da8fef5df29d61948d98a3e83d6',
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerOwnEventsV1': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerOwnEventsV1',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerOwnEventsV1',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerOwnEvents',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'implementationInterfaceId',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
    ],
    hash: '3a7ffc8b69fd7cb01852f914b78dad9892ced78608ba05067bba08c1970cf9ed',
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV10': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV10',
    erc165Identifier: '0xa8e48588',
    name: 'ICedarDeployerV10',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 10,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'implementationInterfaceId',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV4',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV5',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC721DropV5',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV7',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'deployCedarPaymentSplitterV2',
        outputs: [
          {
            internalType: 'contract ICedarPaymentSplitterV2',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceId',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceId',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '1ca8d7da7aed3407f7b681be8b0a27a40fe5fa0d43c55c6dd734d46437c2d3b2',
  },
  'deploy/ICedarDeployer.sol:ICedarERC1155DropFactoryEventsV0': {
    id: 'deploy/ICedarDeployer.sol:ICedarERC1155DropFactoryEventsV0',
    erc165Identifier: '0x00',
    name: 'ICedarERC1155DropFactoryEventsV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarERC1155DropFactoryEvents',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
        ],
        name: 'CedarERC1155DropV2Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
    ],
    hash: 'bceacb9f2a2636ed91c53f7c91163fa437fee6c5c8e359377ff1eb2ca4f64a38',
  },
  'deploy/ICedarDeployer.sol:ICedarERC721DropFactoryEventsV0': {
    id: 'deploy/ICedarDeployer.sol:ICedarERC721DropFactoryEventsV0',
    erc165Identifier: '0x00',
    name: 'ICedarERC721DropFactoryEventsV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarERC721DropFactoryEvents',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
        ],
        name: 'CedarERC721DropV2Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
    ],
    hash: '5e02af95a5eac5f7e8011cd6147599bb9fb167e44df570cfea6e1d831c97f9f0',
  },
  'deploy/ICedarDeployer.sol:ICedarERC721PremintFactoryEventsV1': {
    id: 'deploy/ICedarDeployer.sol:ICedarERC721PremintFactoryEventsV1',
    erc165Identifier: '0x00',
    name: 'ICedarERC721PremintFactoryEventsV1',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarERC721PremintFactoryEvents',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintDeployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
    ],
    hash: '590b2e977948839df01317cb3086175de16b306b8da90c8796c5e7b7fa242c10',
  },
  'deploy/ICedarDeployer.sol:ICedarFactoryEventsV0': {
    id: 'deploy/ICedarDeployer.sol:ICedarFactoryEventsV0',
    erc165Identifier: '0x00',
    name: 'ICedarFactoryEventsV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarFactoryEvents',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
    ],
    hash: '9731581e4fa485d2ccde2fb877ea348cb6b399daffe103a9f31f8039ad5e06b8',
  },
  'deploy/ICedarDeployer.sol:ICedarPaymentSplitterEventsV0': {
    id: 'deploy/ICedarDeployer.sol:ICedarPaymentSplitterEventsV0',
    erc165Identifier: '0x00',
    name: 'ICedarPaymentSplitterEventsV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarPaymentSplitterEvents',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
    ],
    hash: 'ed89bc2b4a75e56707a125c777c76aa8e79477e06275f93d4036bc432f12786b',
  },
  'deploy/ICedarDeployer.sol:IDropFactoryEventsV0': {
    id: 'deploy/ICedarDeployer.sol:IDropFactoryEventsV0',
    erc165Identifier: '0x00',
    name: 'IDropFactoryEventsV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'DropFactoryEvents',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'defaultRoyaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'DropContractDeployment',
        type: 'event',
      },
    ],
    hash: 'd8a0c9f74ecbbd86709987972167cd42ee2961814afdc15e5200dcc252f9d044',
  },
  'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV5': {
    id: 'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV5',
    erc165Identifier: '0x8da9be83',
    name: 'ICedarERC1155DropV5',
    file: 'impl/ICedarERC1155Drop.sol',
    dir: 'impl',
    family: 'CedarERC1155Drop',
    version: 5,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
        ],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'burnBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxTotalSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getLargestTokenId',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTermsDetails',
        outputs: [
          {
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'termsActivated',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: '_termsVersion',
            type: 'uint8',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceId',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceId',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_pause',
            type: 'bool',
          },
        ],
        name: 'setClaimPauseStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_maxTotalSupply',
            type: 'uint256',
          },
        ],
        name: 'setMaxTotalSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_active',
            type: 'bool',
          },
        ],
        name: 'setTermsActivation',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_termsURI',
            type: 'string',
          },
        ],
        name: 'setTermsURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'uri',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'ed568819cee9151e949bc0b927a6de67c06404d989675e1650f6dfbc2fa5c35d',
  },
  'impl/ICedarERC721Drop.sol:ICedarERC721DropV7': {
    id: 'impl/ICedarERC721Drop.sol:ICedarERC721DropV7',
    erc165Identifier: '0xf7195e70',
    name: 'ICedarERC721DropV7',
    file: 'impl/ICedarERC721Drop.sol',
    dir: 'impl',
    family: 'CedarERC721Drop',
    version: 7,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
        ],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxTotalSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTermsDetails',
        outputs: [
          {
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'termsActivated',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: '_termsVersion',
            type: 'uint8',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceId',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceId',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'issueWithTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_pause',
            type: 'bool',
          },
        ],
        name: 'setClaimPauseStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_maxTotalSupply',
            type: 'uint256',
          },
        ],
        name: 'setMaxTotalSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_active',
            type: 'bool',
          },
        ],
        name: 'setTermsActivation',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_termsURI',
            type: 'string',
          },
        ],
        name: 'setTermsURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_tokenURI',
            type: 'string',
          },
        ],
        name: 'setTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'eb35ee939ba7d80276e21208755cca76914218a6df4ec6426b8f35eb80d353c9',
  },
  'impl/ICedarPaymentSplitter.sol:ICedarPaymentSplitterV2': {
    id: 'impl/ICedarPaymentSplitter.sol:ICedarPaymentSplitterV2',
    erc165Identifier: '0x885df601',
    name: 'ICedarPaymentSplitterV2',
    file: 'impl/ICedarPaymentSplitter.sol',
    dir: 'impl',
    family: 'CedarPaymentSplitter',
    version: 2,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
        ],
        name: 'getTotalReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTotalReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceId',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceId',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address payable',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'releasePayment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'releasePayment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '8c105ba03d3a1db9bee038038cc2818cd9b5baf88871480ac9bae880a4f28886',
  },
  'impl/ITermsRegistry.sol:ITermsRegistryV0': {
    id: 'impl/ITermsRegistry.sol:ITermsRegistryV0',
    erc165Identifier: '0x1e6fa65d',
    name: 'ITermsRegistryV0',
    file: 'impl/ITermsRegistry.sol',
    dir: 'impl',
    family: 'TermsRegistry',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'acceptor',
            type: 'address',
          },
        ],
        name: 'TermsAccepted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'isActivated',
            type: 'bool',
          },
        ],
        name: 'TermsActivationStatusUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
        ],
        name: 'TermsUpdated',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
        ],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'getTermsDetails',
        outputs: [
          {
            internalType: 'string',
            name: 'termsURI',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'termsVersion',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'termsActivated',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: '_termsVersion',
            type: 'uint8',
          },
        ],
        name: 'hasAcceptedTerms',
        outputs: [
          {
            internalType: 'bool',
            name: 'hasAccepted',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceId',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceId',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_active',
            type: 'bool',
          },
        ],
        name: 'setTermsActivation',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_termsURI',
            type: 'string',
          },
        ],
        name: 'setTermsURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '784cf89713838518c8dd2aef886d42f64d6c7460761058e730c973edf3b78016',
  },
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV0': {
    id: 'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV0',
    erc165Identifier: '0x98610f1a',
    name: 'ICedarNFTIssuanceV0',
    file: 'issuance/ICedarNFTIssuance.sol',
    dir: 'issuance',
    family: 'CedarNFTIssuance',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'ddbbd2f3bc3c401231fa3f90b5f87afc9f4e765f326b1fd631fa44ea39517aa6',
  },
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1': {
    id: 'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1',
    erc165Identifier: '0x9d6deb50',
    name: 'ICedarNFTIssuanceV1',
    file: 'issuance/ICedarNFTIssuance.sol',
    dir: 'issuance',
    family: 'CedarNFTIssuance',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '79bc145e316c8c2e6ebe45798d02ebed0bbf164e295cfe86275a3e7720f109ee',
  },
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2': {
    id: 'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
    erc165Identifier: '0x83ed0031',
    name: 'ICedarNFTIssuanceV2',
    file: 'issuance/ICedarNFTIssuance.sol',
    dir: 'issuance',
    family: 'CedarNFTIssuance',
    version: 2,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'issueWithTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_tokenURI',
            type: 'string',
          },
        ],
        name: 'setTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'd318f4b009cc5ea765f9d53778f72e119cef15f96e4b9d2d73757d323ea8d839',
  },
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3': {
    id: 'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
    erc165Identifier: '0x83ed0031',
    name: 'ICedarNFTIssuanceV3',
    file: 'issuance/ICedarNFTIssuance.sol',
    dir: 'issuance',
    family: 'CedarNFTIssuance',
    version: 3,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'issueWithTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_tokenURI',
            type: 'string',
          },
        ],
        name: 'setTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'e846708cfd864a2fd8ce143f10ed7cb9b3a639fc0cb08a37c427506f726d139e',
  },
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4': {
    id: 'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
    erc165Identifier: '0x83ed0031',
    name: 'ICedarNFTIssuanceV4',
    file: 'issuance/ICedarNFTIssuance.sol',
    dir: 'issuance',
    family: 'CedarNFTIssuance',
    version: 4,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxTotalSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'issueWithTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_tokenURI',
            type: 'string',
          },
        ],
        name: 'setTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '65220ae9b2c864fba8c8c30f74bc146654c0672f69fe27b2834b6e98b0dfbbdd',
  },
  'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0': {
    id: 'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0',
    erc165Identifier: '0x7f566a34',
    name: 'IPublicNFTIssuanceV0',
    file: 'issuance/ICedarNFTIssuance.sol',
    dir: 'issuance',
    family: 'PublicNFTIssuance',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxTotalSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '83e9c7eaef48c5b8614a441dadecd26d7ee22f34fc59fdd42f3775d229249c41',
  },
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0': {
    id: 'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0',
    erc165Identifier: '0xfcbb6a05',
    name: 'IRestrictedNFTIssuanceV0',
    file: 'issuance/ICedarNFTIssuance.sol',
    dir: 'issuance',
    family: 'RestrictedNFTIssuance',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'issueWithTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_tokenURI',
            type: 'string',
          },
        ],
        name: 'setTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'e3ef4e7c232543a3028ff7e506bcaa36fe8ee21cdb6023b67ada6bafb3ffc445',
  },
  'issuance/ICedarPremint.sol:ICedarPremintV0': {
    id: 'issuance/ICedarPremint.sol:ICedarPremintV0',
    erc165Identifier: '0xb8f9643a',
    name: 'ICedarPremintV0',
    file: 'issuance/ICedarPremint.sol',
    dir: 'issuance',
    family: 'CedarPremint',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_to',
            type: 'address',
          },
        ],
        name: 'mintBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
              },
            ],
            internalType: 'struct ICedarPremintV0.TransferRequest[]',
            name: 'transferRequests',
            type: 'tuple[]',
          },
        ],
        name: 'transferFromBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '186e1b17f4eea521777408731c1d1bb1d4db132b4ca91a2c796bdb191ff96d68',
  },
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV0': {
    id: 'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV0',
    erc165Identifier: '0xc02729cb',
    name: 'ICedarSFTIssuanceV0',
    file: 'issuance/ICedarSFTIssuance.sol',
    dir: 'issuance',
    family: 'CedarSFTIssuance',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'd9591dcbfa7b0b79e94f7d2a4c86e3ffc433d01fe9d1ab5173c2df29ca21fdfb',
  },
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1': {
    id: 'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1',
    erc165Identifier: '0xa776bc16',
    name: 'ICedarSFTIssuanceV1',
    file: 'issuance/ICedarSFTIssuance.sol',
    dir: 'issuance',
    family: 'CedarSFTIssuance',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '01aab14e3693b600e5f7786025da66f807952a8b93f23bd6d5f57214f8e83c10',
  },
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2': {
    id: 'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2',
    erc165Identifier: '0xa776bc16',
    name: 'ICedarSFTIssuanceV2',
    file: 'issuance/ICedarSFTIssuance.sol',
    dir: 'issuance',
    family: 'CedarSFTIssuance',
    version: 2,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '883b99a1b5bc330594eaa7cfffcaffa37bcb7f0daa2065fed37d1bc7ce0477c8',
  },
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3': {
    id: 'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3',
    erc165Identifier: '0xa776bc16',
    name: 'ICedarSFTIssuanceV3',
    file: 'issuance/ICedarSFTIssuance.sol',
    dir: 'issuance',
    family: 'CedarSFTIssuance',
    version: 3,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxTotalSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '530d41d48e388b51205db4e787f54220e86c2f856a64e9c1f430695e7d052530',
  },
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0': {
    id: 'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0',
    erc165Identifier: '0xd3946f7c',
    name: 'IPublicSFTIssuanceV0',
    file: 'issuance/ICedarSFTIssuance.sol',
    dir: 'issuance',
    family: 'PublicSFTIssuance',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxTotalSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'a78397c5b68726f54b2291bb0a41d744becd18376e310bc8b5e623e47d14b8a5',
  },
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV0': {
    id: 'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV0',
    erc165Identifier: '0x74e2d36a',
    name: 'IRestrictedSFTIssuanceV0',
    file: 'issuance/ICedarSFTIssuance.sol',
    dir: 'issuance',
    family: 'RestrictedSFTIssuance',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'bf33c97370f9dd225a9d3d4869165a0b9b684cd885b5629198bccbd90c033052',
  },
  'issuance/IDropClaimCondition.sol:IDropClaimConditionV0': {
    id: 'issuance/IDropClaimCondition.sol:IDropClaimConditionV0',
    erc165Identifier: '0x00',
    name: 'IDropClaimConditionV0',
    file: 'issuance/IDropClaimCondition.sol',
    dir: 'issuance',
    family: 'DropClaimCondition',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [],
    hash: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
  },
  'issuance/INFTLimitSupply.sol:IRestrictedNFTLimitSupplyV0': {
    id: 'issuance/INFTLimitSupply.sol:IRestrictedNFTLimitSupplyV0',
    erc165Identifier: '0x3f3e4c11',
    name: 'IRestrictedNFTLimitSupplyV0',
    file: 'issuance/INFTLimitSupply.sol',
    dir: 'issuance',
    family: 'RestrictedNFTLimitSupply',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_maxTotalSupply',
            type: 'uint256',
          },
        ],
        name: 'setMaxTotalSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'ecf7f557c5f1fb41fb3ea516c105a60bfdb3a11e69bae00dc575a99e6a8bc039',
  },
  'issuance/INFTSupply.sol:INFTSupplyV0': {
    id: 'issuance/INFTSupply.sol:INFTSupplyV0',
    erc165Identifier: '0x574383a4',
    name: 'INFTSupplyV0',
    file: 'issuance/INFTSupply.sol',
    dir: 'issuance',
    family: 'NFTSupply',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '7a10740cfd689e152ee4e5205e6661a94ecc69444d17f5f0464bd98832ea8516',
  },
  'issuance/ISFTLimitSupply.sol:IRestrictedSFTLimitSupplyV0': {
    id: 'issuance/ISFTLimitSupply.sol:IRestrictedSFTLimitSupplyV0',
    erc165Identifier: '0x87198cf2',
    name: 'IRestrictedSFTLimitSupplyV0',
    file: 'issuance/ISFTLimitSupply.sol',
    dir: 'issuance',
    family: 'RestrictedSFTLimitSupply',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_maxTotalSupply',
            type: 'uint256',
          },
        ],
        name: 'setMaxTotalSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'fd8deb5d30b2688b4e1c52cbeeb27374e03b664dc0822ba3832a1270f00d4763',
  },
  'issuance/ISFTSupply.sol:ISFTSupplyV0': {
    id: 'issuance/ISFTSupply.sol:ISFTSupplyV0',
    erc165Identifier: '0xf2387d4f',
    name: 'ISFTSupplyV0',
    file: 'issuance/ISFTSupply.sol',
    dir: 'issuance',
    family: 'SFTSupply',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getLargestTokenId',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '371480baf77f974a3268a4397d354f51ce77214961bf2a4140d4bbb42eb12759',
  },
  'lazymint/ICedarLazyMint.sol:ICedarLazyMintV0': {
    id: 'lazymint/ICedarLazyMint.sol:ICedarLazyMintV0',
    erc165Identifier: '0x47158264',
    name: 'ICedarLazyMintV0',
    file: 'lazymint/ICedarLazyMint.sol',
    dir: 'lazymint',
    family: 'CedarLazyMint',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '63e051dfc14f0d6ee01f2bce34c0e500eaa5f2c81ae44c632fcea2ec328ec692',
  },
  'lazymint/ICedarLazyMint.sol:IRestrictedLazyMintV0': {
    id: 'lazymint/ICedarLazyMint.sol:IRestrictedLazyMintV0',
    erc165Identifier: '0x47158264',
    name: 'IRestrictedLazyMintV0',
    file: 'lazymint/ICedarLazyMint.sol',
    dir: 'lazymint',
    family: 'RestrictedLazyMint',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'e1fcd5a4da043ce9c4e9af5d7e499a588b63cf2c13b3e4814bc188b8c96d85d0',
  },
  'metadata/ICedarNFTMetadata.sol:ICedarNFTMetadataV1': {
    id: 'metadata/ICedarNFTMetadata.sol:ICedarNFTMetadataV1',
    erc165Identifier: '0xc87b56dd',
    name: 'ICedarNFTMetadataV1',
    file: 'metadata/ICedarNFTMetadata.sol',
    dir: 'metadata',
    family: 'CedarNFTMetadata',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '4063a1ca16e2fa00ba19371054b82dff4ecfbe022b37ba16ac216f727f63f0ba',
  },
  'metadata/ICedarSFTMetadata.sol:ICedarSFTMetadataV1': {
    id: 'metadata/ICedarSFTMetadata.sol:ICedarSFTMetadataV1',
    erc165Identifier: '0x0e89341c',
    name: 'ICedarSFTMetadataV1',
    file: 'metadata/ICedarSFTMetadata.sol',
    dir: 'metadata',
    family: 'CedarSFTMetadata',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'uri',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'dd85fe3fa9b4c73dc7b3394a4f7d975aa6020a01b438a874065950d266714a41',
  },
  'metadata/IContractMetadata.sol:ICedarMetadataV1': {
    id: 'metadata/IContractMetadata.sol:ICedarMetadataV1',
    erc165Identifier: '0x7b2de9fe',
    name: 'ICedarMetadataV1',
    file: 'metadata/IContractMetadata.sol',
    dir: 'metadata',
    family: 'CedarMetadata',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
        ],
        name: 'ContractURIUpdated',
        type: 'event',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '8a613de26ff46d7c17786404521daa4718864744b764db21afbfcc2d3cfcc193',
  },
  'metadata/IContractMetadata.sol:IPublicMetadataV0': {
    id: 'metadata/IContractMetadata.sol:IPublicMetadataV0',
    erc165Identifier: '0xe8a3d485',
    name: 'IPublicMetadataV0',
    file: 'metadata/IContractMetadata.sol',
    dir: 'metadata',
    family: 'PublicMetadata',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '4177e50c104c67bf54a9c1382cc109e24369d1f543d6c61f81e7aace0358ae5b',
  },
  'metadata/IContractMetadata.sol:IRestrictedMetadataV0': {
    id: 'metadata/IContractMetadata.sol:IRestrictedMetadataV0',
    erc165Identifier: '0x938e3d7b',
    name: 'IRestrictedMetadataV0',
    file: 'metadata/IContractMetadata.sol',
    dir: 'metadata',
    family: 'RestrictedMetadata',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'a6226fbc2aa18775adbc50e2efa1a25d2cb6a9fd68de8825b65d41e2ce090a81',
  },
  'pausable/ICedarPausable.sol:ICedarPausableV0': {
    id: 'pausable/ICedarPausable.sol:ICedarPausableV0',
    erc165Identifier: '0x32bc7ce1',
    name: 'ICedarPausableV0',
    file: 'pausable/ICedarPausable.sol',
    dir: 'pausable',
    family: 'CedarPausable',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'pauseStatus',
            type: 'bool',
          },
        ],
        name: 'ClaimPauseStatusUpdated',
        type: 'event',
      },
      {
        inputs: [],
        name: 'pauseClaims',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpauseClaims',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '9f2608d8cfe2198e452bb86b59504354719c09eefb7df562c7127ca5b3ce9e41',
  },
  'pausable/ICedarPausable.sol:ICedarPausableV1': {
    id: 'pausable/ICedarPausable.sol:ICedarPausableV1',
    erc165Identifier: '0x2745d444',
    name: 'ICedarPausableV1',
    file: 'pausable/ICedarPausable.sol',
    dir: 'pausable',
    family: 'CedarPausable',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'pauseStatus',
            type: 'bool',
          },
        ],
        name: 'ClaimPauseStatusUpdated',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_pause',
            type: 'bool',
          },
        ],
        name: 'setClaimPauseStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'bd7ba118875186dcb4f2213b31e169dd56cb6ad39ee7fa085c50a950b27e1459',
  },
  'pausable/ICedarPausable.sol:IRestrictedPausableV0': {
    id: 'pausable/ICedarPausable.sol:IRestrictedPausableV0',
    erc165Identifier: '0x2745d444',
    name: 'IRestrictedPausableV0',
    file: 'pausable/ICedarPausable.sol',
    dir: 'pausable',
    family: 'RestrictedPausable',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_pause',
            type: 'bool',
          },
        ],
        name: 'setClaimPauseStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '86b1a919b6d82fd8d366d9b971330f63974fde097ec1c1ae6ac210d61b34a424',
  },
  'primarysale/IPrimarySale.sol:IPrimarySaleV0': {
    id: 'primarysale/IPrimarySale.sol:IPrimarySaleV0',
    erc165Identifier: '0x68d0cc39',
    name: 'IPrimarySaleV0',
    file: 'primarysale/IPrimarySale.sol',
    dir: 'primarysale',
    family: 'PrimarySale',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        name: 'PrimarySaleRecipientUpdated',
        type: 'event',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '637b1a0e4d1059c652b8245e38e7ae59cf2ecdea6760e623841de9b0373d374b',
  },
  'primarysale/IPrimarySale.sol:IPrimarySaleV1': {
    id: 'primarysale/IPrimarySale.sol:IPrimarySaleV1',
    erc165Identifier: '0x68d0cc39',
    name: 'IPrimarySaleV1',
    file: 'primarysale/IPrimarySale.sol',
    dir: 'primarysale',
    family: 'PrimarySale',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'frogs',
            type: 'bool',
          },
        ],
        name: 'PrimarySaleRecipientUpdated',
        type: 'event',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'f1be9ce2a58e68c3f6ba5bcbc11fe81865bc036a85d6cbe5119fd17672ffcd40',
  },
  'primarysale/IPrimarySale.sol:IPublicPrimarySaleV1': {
    id: 'primarysale/IPrimarySale.sol:IPublicPrimarySaleV1',
    erc165Identifier: '0x079fe40e',
    name: 'IPublicPrimarySaleV1',
    file: 'primarysale/IPrimarySale.sol',
    dir: 'primarysale',
    family: 'PublicPrimarySale',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '8ebe2f93deb5f762512add289cbf9013ec92a898b7492513b37fa405f4f6cd7c',
  },
  'primarysale/IPrimarySale.sol:IRestrictedPrimarySaleV1': {
    id: 'primarysale/IPrimarySale.sol:IRestrictedPrimarySaleV1',
    erc165Identifier: '0x6f4f2837',
    name: 'IRestrictedPrimarySaleV1',
    file: 'primarysale/IPrimarySale.sol',
    dir: 'primarysale',
    family: 'RestrictedPrimarySale',
    version: 1,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '305e2d1fbe66c1bbfba43b8510b05c4d9d6bee453084d71161b4a094172012fc',
  },
  'royalties/IRoyalty.sol:IPublicRoyaltyV0': {
    id: 'royalties/IRoyalty.sol:IPublicRoyaltyV0',
    erc165Identifier: '0xd4db5abc',
    name: 'IPublicRoyaltyV0',
    file: 'royalties/IRoyalty.sol',
    dir: 'royalties',
    family: 'PublicRoyalty',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'c7de8ad4d9271b82cbe3294504853a18bd0640138f050ac4b3e504c1c31585f1',
  },
  'royalties/IRoyalty.sol:IRestrictedRoyaltyV0': {
    id: 'royalties/IRoyalty.sol:IRestrictedRoyaltyV0',
    erc165Identifier: '0xfbc2afff',
    name: 'IRestrictedRoyaltyV0',
    file: 'royalties/IRoyalty.sol',
    dir: 'royalties',
    family: 'RestrictedRoyalty',
    version: 0,
    delegated: true,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'ddcb9a35813f06f644047d991465e608e6ee83a9c28ad23aff14dda5816c435b',
  },
  'royalties/IRoyalty.sol:IRoyaltyV0': {
    id: 'royalties/IRoyalty.sol:IRoyaltyV0',
    erc165Identifier: '0x2f19f543',
    name: 'IRoyaltyV0',
    file: 'royalties/IRoyalty.sol',
    dir: 'royalties',
    family: 'Royalty',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '1e12d585a2ae8d7db3722d8a5694b7c0d2b03561e3a2019f934eccadf3a59dad',
  },
  'splitpayment/ICedarSplitPayment.sol:ICedarSplitPaymentV0': {
    id: 'splitpayment/ICedarSplitPayment.sol:ICedarSplitPaymentV0',
    erc165Identifier: '0x8120d881',
    name: 'ICedarSplitPaymentV0',
    file: 'splitpayment/ICedarSplitPayment.sol',
    dir: 'splitpayment',
    family: 'CedarSplitPayment',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
        ],
        name: 'getTotalReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTotalReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address payable',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'releasePayment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'releasePayment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '0ae3026805838045bd0c6b4a5dc87f0d817fa320c42712c0538b72e038f50e0e',
  },
  'standard/IERC1155.sol:IERC1155SupplyV0': {
    id: 'standard/IERC1155.sol:IERC1155SupplyV0',
    erc165Identifier: '0x2a998dc1',
    name: 'IERC1155SupplyV0',
    file: 'standard/IERC1155.sol',
    dir: 'standard',
    family: 'ERC1155Supply',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '56cdc870936c30699b132c53c8b456ab40d1009dd3304ad977065965c25d8a6e',
  },
  'standard/IERC1155.sol:IERC1155SupplyV1': {
    id: 'standard/IERC1155.sol:IERC1155SupplyV1',
    erc165Identifier: '0x2a71cece',
    name: 'IERC1155SupplyV1',
    file: 'standard/IERC1155.sol',
    dir: 'standard',
    family: 'ERC1155Supply',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getLargestTokenId',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '7a75b9ade4a6127c9be75d93f1e38703206754f710ad8c124b4ac14c14d66f59',
  },
  'standard/IERC1155.sol:IERC1155SupplyV2': {
    id: 'standard/IERC1155.sol:IERC1155SupplyV2',
    erc165Identifier: '0xb4788050',
    name: 'IERC1155SupplyV2',
    file: 'standard/IERC1155.sol',
    dir: 'standard',
    family: 'ERC1155Supply',
    version: 2,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'burnBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getLargestTokenId',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'b7d90f5aa8f17dd4fcd9b2e628bc5483288afbde12368b39d135d531b0a93984',
  },
  'standard/IERC1155.sol:IERC1155V0': {
    id: 'standard/IERC1155.sol:IERC1155V0',
    erc165Identifier: '0xd849b381',
    name: 'IERC1155V0',
    file: 'standard/IERC1155.sol',
    dir: 'standard',
    family: 'ERC1155',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '6d8dbc2b56df5f337b842f4073278849a09a01fb662c4a2834a958201b62541f',
  },
  'standard/IERC1155.sol:IERC1155V1': {
    id: 'standard/IERC1155.sol:IERC1155V1',
    erc165Identifier: '0x4640fd1f',
    name: 'IERC1155V1',
    file: 'standard/IERC1155.sol',
    dir: 'standard',
    family: 'ERC1155',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'burnBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'b7be5e242b3edcf2e049a23f7bfb91aaf6ca536d1e38060dc4df4291ecc5acf7',
  },
  'standard/IERC2981.sol:IERC2981V0': {
    id: 'standard/IERC2981.sol:IERC2981V0',
    erc165Identifier: '0x2a55205a',
    name: 'IERC2981V0',
    file: 'standard/IERC2981.sol',
    dir: 'standard',
    family: 'ERC2981',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'ca9ff3dddec05dd425d285f440ed87267a155509103ebd1a1792ffc01fac9c91',
  },
  'standard/IERC721.sol:IERC721V0': {
    id: 'standard/IERC721.sol:IERC721V0',
    erc165Identifier: '0x8153916a',
    name: 'IERC721V0',
    file: 'standard/IERC721.sol',
    dir: 'standard',
    family: 'ERC721',
    version: 0,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '9fe68930af850d898a73eda66c7f4e38874e3963265835bfb8350da5f4a903ba',
  },
  'standard/IERC721.sol:IERC721V1': {
    id: 'standard/IERC721.sol:IERC721V1',
    erc165Identifier: '0xc3c5fd02',
    name: 'IERC721V1',
    file: 'standard/IERC721.sol',
    dir: 'standard',
    family: 'ERC721',
    version: 1,
    delegated: false,
    deprecated: false,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'da13b4ee5f6a9501cbda236406c39fb07093978c669424615a1c8cbc56170755',
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerOwnEventsV0': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerOwnEventsV0',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerOwnEventsV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerOwnEvents',
    version: 0,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
    ],
    hash: '4e18c303ff2131328847520fbbc7e9a8f8c20381258233c62c5bc9fc71023551',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV9': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV9',
    erc165Identifier: '0x3feb7d8a',
    name: 'ICedarDeployerV9',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 9,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV4',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV4',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC721DropV5',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV6',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV2',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV2',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'deployCedarPaymentSplitterV1',
        outputs: [
          {
            internalType: 'contract ICedarPaymentSplitterV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceName',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'b5e1a677fff262962ffc01eaa72830688e001b134a25dbcb4cd37b62b9e22e0a',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV4': {
    id: 'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV4',
    erc165Identifier: '0x746eb3a8',
    name: 'ICedarERC1155DropV4',
    file: 'impl/ICedarERC1155Drop.sol',
    dir: 'impl',
    family: 'CedarERC1155Drop',
    version: 4,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'pauseStatus',
            type: 'bool',
          },
        ],
        name: 'ClaimPauseStatusUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
        ],
        name: 'ContractURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        name: 'PrimarySaleRecipientUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getLargestTokenId',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceName',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pauseClaims',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_maxTotalSupply',
            type: 'uint256',
          },
        ],
        name: 'setMaxTotalSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpauseClaims',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '0ebcb7aeca62b1b6eaa5720aaf418a560dbb8aa48c848bbcad86525cc03f525d',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Drop.sol:ICedarERC721DropV6': {
    id: 'impl/ICedarERC721Drop.sol:ICedarERC721DropV6',
    erc165Identifier: '0x8b8bc615',
    name: 'ICedarERC721DropV6',
    file: 'impl/ICedarERC721Drop.sol',
    dir: 'impl',
    family: 'CedarERC721Drop',
    version: 6,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'pauseStatus',
            type: 'bool',
          },
        ],
        name: 'ClaimPauseStatusUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
        ],
        name: 'ContractURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        name: 'PrimarySaleRecipientUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isClaimPaused',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCountInPhase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceName',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'issueWithTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pauseClaims',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_maxTotalSupply',
            type: 'uint256',
          },
        ],
        name: 'setMaxTotalSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_tokenURI',
            type: 'string',
          },
        ],
        name: 'setTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpauseClaims',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '32ee94c8e50f179d7b4bae025ba599bf1377918f9a55391717bfedc6f6446a47',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Premint.sol:ICedarERC721PremintV2': {
    id: 'impl/ICedarERC721Premint.sol:ICedarERC721PremintV2',
    erc165Identifier: '0xa4fdd24a',
    name: 'ICedarERC721PremintV2',
    file: 'impl/ICedarERC721Premint.sol',
    dir: 'impl',
    family: 'CedarERC721Premint',
    version: 2,
    abi: [
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceName',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_to',
            type: 'address',
          },
        ],
        name: 'mintBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
              },
            ],
            internalType: 'struct ICedarPremintV0.TransferRequest[]',
            name: 'transferRequests',
            type: 'tuple[]',
          },
        ],
        name: 'transferFromBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'upgradeBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'baf280848c378a4483557043790664c97a0a111d62829733300b5db18868c3a5',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarPaymentSplitter.sol:ICedarPaymentSplitterV1': {
    id: 'impl/ICedarPaymentSplitter.sol:ICedarPaymentSplitterV1',
    erc165Identifier: '0xbb8163de',
    name: 'ICedarPaymentSplitterV1',
    file: 'impl/ICedarPaymentSplitter.sol',
    dir: 'impl',
    family: 'CedarPaymentSplitter',
    version: 1,
    abi: [
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
        ],
        name: 'getTotalReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTotalReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationInterfaceName',
        outputs: [
          {
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address payable',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'releasePayment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'releasePayment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '559c54656758a09ffe819745c286f7ae1956d03d285ad88182cf6be367751d32',
    deprecated: true,
    delegated: false,
  },
  'issuance/INFTLimitSupply.sol:INFTLimitSupplyV0': {
    id: 'issuance/INFTLimitSupply.sol:INFTLimitSupplyV0',
    erc165Identifier: '0x3f3e4c11',
    name: 'INFTLimitSupplyV0',
    file: 'issuance/INFTLimitSupply.sol',
    dir: 'issuance',
    family: 'NFTLimitSupply',
    version: 0,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_maxTotalSupply',
            type: 'uint256',
          },
        ],
        name: 'setMaxTotalSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'ecf7f557c5f1fb41fb3ea516c105a60bfdb3a11e69bae00dc575a99e6a8bc039',
    deprecated: true,
    delegated: false,
  },
  'issuance/ISFTLimitSupply.sol:ISFTLimitSupplyV0': {
    id: 'issuance/ISFTLimitSupply.sol:ISFTLimitSupplyV0',
    erc165Identifier: '0x87198cf2',
    name: 'ISFTLimitSupplyV0',
    file: 'issuance/ISFTLimitSupply.sol',
    dir: 'issuance',
    family: 'SFTLimitSupply',
    version: 0,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_maxTotalSupply',
            type: 'uint256',
          },
        ],
        name: 'setMaxTotalSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'fd8deb5d30b2688b4e1c52cbeeb27374e03b664dc0822ba3832a1270f00d4763',
    deprecated: true,
    delegated: false,
  },
  'IOrder.sol:IOrderV0': {
    id: 'IOrder.sol:IOrderV0',
    erc165Identifier: '0x00',
    name: 'IOrderV0',
    file: 'IOrder.sol',
    dir: '.',
    family: 'Order',
    version: 0,
    abi: [],
    hash: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerEventsV7': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerEventsV7',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerEventsV7',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerEvents',
    version: 7,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
        ],
        name: 'CedarERC1155DropV2Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
        ],
        name: 'CedarERC721DropV2Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
    ],
    hash: '9fca227da15628817d66c9533c62dff62ba79e41deb02af3ca2f1858357557ec',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV8': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV8',
    erc165Identifier: '0xd7c8b7ce',
    name: 'ICedarDeployerV8',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 8,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV3',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV3',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC721DropV5',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV5',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'deployCedarPaymentSplitterV0',
        outputs: [
          {
            internalType: 'contract ICedarPaymentSplitterV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '86a4d2515387aa3d0cc5186176599cf0793b2e18f4a80e77ae22212e1a4bdcd9',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarERC721PremintFactoryEventsV0': {
    id: 'deploy/ICedarDeployer.sol:ICedarERC721PremintFactoryEventsV0',
    erc165Identifier: '0x00',
    name: 'ICedarERC721PremintFactoryEventsV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarERC721PremintFactoryEvents',
    version: 0,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
    ],
    hash: '3e344d1ccfcc3b84540329141a0e06c39ffa063364049bc3c933dfa237e0606f',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV3': {
    id: 'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV3',
    erc165Identifier: '0x8aa306b9',
    name: 'ICedarERC1155DropV3',
    file: 'impl/ICedarERC1155Drop.sol',
    dir: 'impl',
    family: 'CedarERC1155Drop',
    version: 3,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
        ],
        name: 'ContractURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        name: 'PrimarySaleRecipientUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '23934797cf7b47653969099d136cd436e92064295652675fcc9786d7a3dd5156',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Drop.sol:ICedarERC721DropV5': {
    id: 'impl/ICedarERC721Drop.sol:ICedarERC721DropV5',
    erc165Identifier: '0xcd89f0e8',
    name: 'ICedarERC721DropV5',
    file: 'impl/ICedarERC721Drop.sol',
    dir: 'impl',
    family: 'CedarERC721Drop',
    version: 5,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
        ],
        name: 'ContractURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        name: 'PrimarySaleRecipientUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'updater',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'TokenURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'issuer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        name: 'issueWithTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_tokenURI',
            type: 'string',
          },
        ],
        name: 'setTokenURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'cb6a2f63768ee5d596a6360d7880819320a3c59707f83dcc76b5193e2d53b52b',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Premint.sol:ICedarERC721PremintV1': {
    id: 'impl/ICedarERC721Premint.sol:ICedarERC721PremintV1',
    erc165Identifier: '0xef7dd447',
    name: 'ICedarERC721PremintV1',
    file: 'impl/ICedarERC721Premint.sol',
    dir: 'impl',
    family: 'CedarERC721Premint',
    version: 1,
    abi: [
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_to',
            type: 'address',
          },
        ],
        name: 'mintBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
              },
            ],
            internalType: 'struct ICedarPremintV0.TransferRequest[]',
            name: 'transferRequests',
            type: 'tuple[]',
          },
        ],
        name: 'transferFromBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'upgradeBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '7e9c77e4377f630ea683da4c0d5610490c34ab6f56c63b29fc6389d1ec6ce487',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarPaymentSplitter.sol:ICedarPaymentSplitterV0': {
    id: 'impl/ICedarPaymentSplitter.sol:ICedarPaymentSplitterV0',
    erc165Identifier: '0xf00165d3',
    name: 'ICedarPaymentSplitterV0',
    file: 'impl/ICedarPaymentSplitter.sol',
    dir: 'impl',
    family: 'CedarPaymentSplitter',
    version: 0,
    abi: [
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
        ],
        name: 'getTotalReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getTotalReleased',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address payable',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'releasePayment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20Upgradeable',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'releasePayment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '78aa7e06d3704650301a23a87852d9240202b1e7f589efbe26e2b2c5422b2aca',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerAddedV1': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerAddedV1',
    erc165Identifier: '0x80eacead',
    name: 'ICedarDeployerAddedV1',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerAdded',
    version: 1,
    abi: [
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV0',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'fd6ab1fb5e8de5b22ec8911477ffe2c1f0a6bd315e6b2c7f9189f0455baae8dd',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerAddedV2': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerAddedV2',
    erc165Identifier: '0x685e1c4f',
    name: 'ICedarDeployerAddedV2',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerAdded',
    version: 2,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '8f0726a0945b46ae30a04d15faf4ac92039963945b2058e9ab1147e394ddc8d2',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerAddedV3': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerAddedV3',
    erc165Identifier: '0x7f61b080',
    name: 'ICedarDeployerAddedV3',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerAdded',
    version: 3,
    abi: [
      {
        inputs: [],
        name: 'cedarPaymentSplitterFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'shares_',
            type: 'uint256[]',
          },
        ],
        name: 'deployCedarPaymentSplitterV0',
        outputs: [
          {
            internalType: 'contract ICedarPaymentSplitterV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'de5f4c2eff28617cda3f3fb0b83ceee7dd9471929ab3af4d667fa0ed4e9976cb',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerAddedV4': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerAddedV4',
    erc165Identifier: '0xe0d679f0',
    name: 'ICedarDeployerAddedV4',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerAdded',
    version: 4,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV1',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721DropV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '27bd78672b3ae269d53d12be2eb15c7b7f59ae2eee1cbd6377206c850255a3f5',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerAddedV5': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerAddedV5',
    erc165Identifier: '0x6068145c',
    name: 'ICedarDeployerAddedV5',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerAdded',
    version: 5,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV1',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721DropV2',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV2',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '2d9577f84bc5c218068b11364a536a642ea52b079a2fe4d5e440667a7da9e369',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerAddedV6': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerAddedV6',
    erc165Identifier: '0x50197595',
    name: 'ICedarDeployerAddedV6',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerAdded',
    version: 6,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV1',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC721DropV2',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV2',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '3b40b0b88595c26a91135f41016ce391a8df5087585b480ff1e81bbc5b3628bd',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerAddedV7': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerAddedV7',
    erc165Identifier: '0xdb037bc0',
    name: 'ICedarDeployerAddedV7',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerAdded',
    version: 7,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV1',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC721DropV3',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV3',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '75d96a79c5a25567cfacf3aeed7008c35e3cfc5c35ebe59b353508933da89c69',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerAddedV8': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerAddedV8',
    erc165Identifier: '0x9243ea05',
    name: 'ICedarDeployerAddedV8',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerAdded',
    version: 8,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV2',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV2',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC721DropV4',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV4',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '11a5f3a24e4d117af0da66c2e1fa0f8b710ee279dececdf49a9c0762aec08710',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerEventsV0': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerEventsV0',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerEventsV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerEvents',
    version: 0,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
    ],
    hash: 'c3179e371fb2d99fdd77b8b3c002727c2186a7ec58718467d8705c5cf69da46f',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerEventsV1': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerEventsV1',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerEventsV1',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerEvents',
    version: 1,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
    ],
    hash: '84445cb326eba894789e955d531da994c8edb98611f9fc28e2e596f16a4a6333',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerEventsV2': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerEventsV2',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerEventsV2',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerEvents',
    version: 2,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
    ],
    hash: 'fd4decadb189cdd83484bea516b90a8daebf92f3c27f6e276c8451e95400913b',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerEventsV3': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerEventsV3',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerEventsV3',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerEvents',
    version: 3,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
    ],
    hash: '6baf23935fb8bf7bdce4fb365673e9816dce3227128055941f1561ad8a5751c5',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerEventsV4': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerEventsV4',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerEventsV4',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerEvents',
    version: 4,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
    ],
    hash: '9b7c40ca056c87657ad629363c33c9c32f3f8cd838ce0687a47f5b43eaf6862c',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerEventsV5': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerEventsV5',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerEventsV5',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerEvents',
    version: 5,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
        ],
        name: 'CedarERC721DropV2Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
    ],
    hash: 'd732d2647ed0d0d3aa74b833a9692bdfe282cc35446784efee1156707a9be3c0',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerEventsV6': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerEventsV6',
    erc165Identifier: '0x00',
    name: 'ICedarDeployerEventsV6',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerEvents',
    version: 6,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
        ],
        name: 'CedarERC1155DropV2Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
    ],
    hash: '5e88a24864461817bd5ce1307daee98ee3dddf5e9a2a0a374be4b2efed155336',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerIntrospectionV0': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerIntrospectionV0',
    erc165Identifier: '0x0a610757',
    name: 'ICedarDeployerIntrospectionV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployerIntrospection',
    version: 0,
    abi: [
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'cebd4f22856443e999bd23f37b30de6711ae257c20cd460260ff06a61011baf5',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV0': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV0',
    erc165Identifier: '0x0c05b4dc',
    name: 'ICedarDeployerV0',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 0,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721DropV0',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV0',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '0c6524ca856a74e85e7bb36f8e5059debabb9e10293fd15f0e2265ff602e8a9d',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV1': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV1',
    erc165Identifier: '0x8cef7a71',
    name: 'ICedarDeployerV1',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 1,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV0',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721DropV0',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV0',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '8f89b8bb74092bbe69261ee6afd199bc58ca60d10a6d376b30a6faf5d2ae7f72',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV2': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV2',
    erc165Identifier: '0xe4b1663e',
    name: 'ICedarDeployerV2',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 2,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV0',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721DropV0',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV0',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '47698d10ffa60aa893437c39d2984661cd0e9de580a81ff362022d868d4b74c4',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV3': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV3',
    erc165Identifier: '0x9bd0d6be',
    name: 'ICedarDeployerV3',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 3,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV0',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721DropV0',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV0',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'shares_',
            type: 'uint256[]',
          },
        ],
        name: 'deployCedarPaymentSplitterV0',
        outputs: [
          {
            internalType: 'contract ICedarPaymentSplitterV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '3c42ab11ccc8b2873a4de16662e9dd50c5c3ffb58e71edae5842e082d50bb17d',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV4': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV4',
    erc165Identifier: '0xfd88d268',
    name: 'ICedarDeployerV4',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 4,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV1',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721DropV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'shares_',
            type: 'uint256[]',
          },
        ],
        name: 'deployCedarPaymentSplitterV0',
        outputs: [
          {
            internalType: 'contract ICedarPaymentSplitterV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '527afbc6a6a5136c87296e4888fd92c3302726537f20319f8eb297ef449f565b',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV5': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV5',
    erc165Identifier: '0x7d36bfc4',
    name: 'ICedarDeployerV5',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 5,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV1',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721DropV2',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV2',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'shares_',
            type: 'uint256[]',
          },
        ],
        name: 'deployCedarPaymentSplitterV0',
        outputs: [
          {
            internalType: 'contract ICedarPaymentSplitterV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '804b58c41d97e815ac8bd8ef87df805d945bb42be829f6a437053c90253c46e0',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV6': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV6',
    erc165Identifier: '0xc65dd058',
    name: 'ICedarDeployerV6',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 6,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
        ],
        name: 'CedarERC721DropV2Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV1',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC721DropV3',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV3',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'shares_',
            type: 'uint256[]',
          },
        ],
        name: 'deployCedarPaymentSplitterV0',
        outputs: [
          {
            internalType: 'contract ICedarPaymentSplitterV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '465ab6845634939bb51a9e97442f0d9b824488cee47c43cdfacc7eab6199d1d2',
    deprecated: true,
    delegated: false,
  },
  'deploy/ICedarDeployer.sol:ICedarDeployerV7': {
    id: 'deploy/ICedarDeployer.sol:ICedarDeployerV7',
    erc165Identifier: '0x8f1d419d',
    name: 'ICedarDeployerV7',
    file: 'deploy/ICedarDeployer.sol',
    dir: 'deploy',
    family: 'CedarDeployer',
    version: 7,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'platformFeeBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'CedarERC1155DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'defaultAdmin',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'trustedForwarders',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'saleRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint128',
            name: 'royaltyBps',
            type: 'uint128',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'signatureVerifier',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'greenlistManager',
            type: 'address',
          },
        ],
        name: 'CedarERC721DropV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
        ],
        name: 'CedarERC721DropV2Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV0Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'maxLimit',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'userAgreement',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'CedarERC721PremintV1Deployment',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementationAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'contractName',
            type: 'string',
          },
        ],
        name: 'CedarImplementationDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'interfaceName',
            type: 'string',
          },
        ],
        name: 'CedarInterfaceDeployed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'majorVersion',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'minorVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'patchVersion',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'shares',
            type: 'uint256[]',
          },
        ],
        name: 'CedarPaymentSplitterDeployment',
        type: 'event',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC1155DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721DropVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarERC721PremintVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cedarPaymentSplitterVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC1155DropV2',
        outputs: [
          {
            internalType: 'contract ICedarERC1155DropV2',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_defaultAdmin',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_contractURI',
            type: 'string',
          },
          {
            internalType: 'address[]',
            name: '_trustedForwarders',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint128',
            name: '_royaltyBps',
            type: 'uint128',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'uint128',
            name: '_platformFeeBps',
            type: 'uint128',
          },
          {
            internalType: 'address',
            name: '_platformFeeRecipient',
            type: 'address',
          },
        ],
        name: 'deployCedarERC721DropV4',
        outputs: [
          {
            internalType: 'contract ICedarERC721DropV4',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_maxLimit',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_userAgreement',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI_',
            type: 'string',
          },
        ],
        name: 'deployCedarERC721PremintV1',
        outputs: [
          {
            internalType: 'contract ICedarERC721PremintV1',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'payees',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'shares_',
            type: 'uint256[]',
          },
        ],
        name: 'deployCedarPaymentSplitterV0',
        outputs: [
          {
            internalType: 'contract ICedarPaymentSplitterV0',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '5059c94d4737f17df436e685b93b4f6712a4311bb6b605c21c4ea4887fd12f62',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV0': {
    id: 'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV0',
    erc165Identifier: '0x1b5a9dec',
    name: 'ICedarERC1155DropV0',
    file: 'impl/ICedarERC1155Drop.sol',
    dir: 'impl',
    family: 'CedarERC1155Drop',
    version: 0,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'e52d4b84aa5b6c3478839841cbaa49d52953de6a85494f4bf7cb7b366fb043bd',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV1': {
    id: 'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV1',
    erc165Identifier: '0x5312fd72',
    name: 'ICedarERC1155DropV1',
    file: 'impl/ICedarERC1155Drop.sol',
    dir: 'impl',
    family: 'CedarERC1155Drop',
    version: 1,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'b5062c01f2cc52f7d0e2132c5afbad5ec8ba12a32f54ccbd06749e6c99609f44',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV2': {
    id: 'impl/ICedarERC1155Drop.sol:ICedarERC1155DropV2',
    erc165Identifier: '0x8aa306b9',
    name: 'ICedarERC1155DropV2',
    file: 'impl/ICedarERC1155Drop.sol',
    dir: 'impl',
    family: 'CedarERC1155Drop',
    version: 2,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        name: 'PrimarySaleRecipientUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensIssued',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            indexed: false,
            internalType: 'uint256[]',
            name: 'values',
            type: 'uint256[]',
          },
        ],
        name: 'TransferBatch',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'TransferSingle',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'value',
            type: 'string',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'URI',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'accounts',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
        ],
        name: 'balanceOfBatch',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'exists',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256[]',
            name: 'ids',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeBatchTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '00011b0b7b3bcf4290ed54fe3adb61489af9fc2c9531e474449fbf6bc0481c24',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Drop.sol:ICedarERC721DropV0': {
    id: 'impl/ICedarERC721Drop.sol:ICedarERC721DropV0',
    erc165Identifier: '0x16068f66',
    name: 'ICedarERC721DropV0',
    file: 'impl/ICedarERC721Drop.sol',
    dir: 'impl',
    family: 'CedarERC721Drop',
    version: 0,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'bytes',
            name: 'encryptedBaseURI',
            type: 'bytes',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
          {
            internalType: 'bytes',
            name: 'encryptedBaseURI',
            type: 'bytes',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '95cd47a699ae26a814a1ffa31ac9357379ea499c6c3bde14fdf8d406b68214df',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Drop.sol:ICedarERC721DropV1': {
    id: 'impl/ICedarERC721Drop.sol:ICedarERC721DropV1',
    erc165Identifier: '0x048f7e23',
    name: 'ICedarERC721DropV1',
    file: 'impl/ICedarERC721Drop.sol',
    dir: 'impl',
    family: 'CedarERC721Drop',
    version: 1,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'bytes',
            name: 'encryptedBaseURI',
            type: 'bytes',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
          {
            internalType: 'bytes',
            name: 'encryptedBaseURI',
            type: 'bytes',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'a4bdfdc8dc023053d11456222e9423e16e34de9417ce04571747b4abe84328eb',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Drop.sol:ICedarERC721DropV2': {
    id: 'impl/ICedarERC721Drop.sol:ICedarERC721DropV2',
    erc165Identifier: '0xbbd9d7b0',
    name: 'ICedarERC721DropV2',
    file: 'impl/ICedarERC721Drop.sol',
    dir: 'impl',
    family: 'CedarERC721Drop',
    version: 2,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: 'af816961eb9ec9b618b8b42bf989b92b079bb901f5e8c7d940ad789d758f99ab',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Drop.sol:ICedarERC721DropV3': {
    id: 'impl/ICedarERC721Drop.sol:ICedarERC721DropV3',
    erc165Identifier: '0xbbd9d7b0',
    name: 'ICedarERC721DropV3',
    file: 'impl/ICedarERC721Drop.sol',
    dir: 'impl',
    family: 'CedarERC721Drop',
    version: 3,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '79562d0971e108b9b04ae240d421ae6cc6eff67e2cddc581342d4ae8b9a03921',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Drop.sol:ICedarERC721DropV4': {
    id: 'impl/ICedarERC721Drop.sol:ICedarERC721DropV4',
    erc165Identifier: '0xd3091b89',
    name: 'ICedarERC721DropV4',
    file: 'impl/ICedarERC721Drop.sol',
    dir: 'impl',
    family: 'CedarERC721Drop',
    version: 4,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'BaseURIUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            indexed: false,
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'claimConditions',
            type: 'tuple[]',
          },
        ],
        name: 'ClaimConditionsUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newRoyaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'newRoyaltyBps',
            type: 'uint256',
          },
        ],
        name: 'DefaultRoyalty',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        name: 'PrimarySaleRecipientUpdated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'royaltyRecipient',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'RoyaltyForToken',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'claimConditionIndex',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'claimer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'quantityClaimed',
            type: 'uint256',
          },
        ],
        name: 'TokensClaimed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proofs',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'proofMaxQuantityPerTransaction',
            type: 'uint256',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getActiveClaimConditions',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition',
            name: 'condition',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletMaxClaimCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainingSupply',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBaseURIIndices',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDefaultRoyaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getRoyaltyInfoForToken',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
        ],
        name: 'getUserClaimConditions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'conditionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'walletClaimedCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextValidClaimTimestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'primarySaleRecipient',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salePrice',
            type: 'uint256',
          },
        ],
        name: 'royaltyInfo',
        outputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'royaltyAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'startTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxClaimableSupply',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'supplyClaimed',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerTransaction',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'waitTimeInSecondsBetweenClaims',
                type: 'uint256',
              },
              {
                internalType: 'bytes32',
                name: 'merkleRoot',
                type: 'bytes32',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDropClaimConditionV0.ClaimCondition[]',
            name: 'phases',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'resetClaimEligibility',
            type: 'bool',
          },
        ],
        name: 'setClaimConditions',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_royaltyRecipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_royaltyBps',
            type: 'uint256',
          },
        ],
        name: 'setDefaultRoyaltyInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_saleRecipient',
            type: 'address',
          },
        ],
        name: 'setPrimarySaleRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'bps',
            type: 'uint256',
          },
        ],
        name: 'setRoyaltyInfoForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'baseURIIndex',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: '_baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'updateBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_conditionId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_claimer',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifyMaxQuantityPerTransaction',
            type: 'bool',
          },
        ],
        name: 'verifyClaim',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '9365694fa5138a353813d8c60574b29f5b5d284903e8b719cf9486fad871f723',
    deprecated: true,
    delegated: false,
  },
  'impl/ICedarERC721Premint.sol:ICedarERC721PremintV0': {
    id: 'impl/ICedarERC721Premint.sol:ICedarERC721PremintV0',
    erc165Identifier: '0x5dd269fc',
    name: 'ICedarERC721PremintV0',
    file: 'impl/ICedarERC721Premint.sol',
    dir: 'impl',
    family: 'CedarERC721Premint',
    version: 0,
    abi: [
      {
        inputs: [],
        name: 'acceptTerms',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAgreementStatus',
        outputs: [
          {
            internalType: 'bool',
            name: 'sig',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'implementationVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'major',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'isICedarFeaturesV0',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minorVersion',
        outputs: [
          {
            internalType: 'uint256',
            name: 'minor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'patch',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_to',
            type: 'address',
          },
        ],
        name: 'mintBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes[]',
            name: 'data',
            type: 'bytes[]',
          },
        ],
        name: 'multicall',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'results',
            type: 'bytes[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_status',
            type: 'bool',
          },
        ],
        name: 'setTermsStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_acceptor',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: '_signature',
            type: 'bytes',
          },
        ],
        name: 'storeTermsAccepted',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'supportedFeatures',
        outputs: [
          {
            internalType: 'string[]',
            name: 'features',
            type: 'string[]',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'termsActivated',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
              },
            ],
            internalType: 'struct ICedarPremintV0.TransferRequest[]',
            name: 'transferRequests',
            type: 'tuple[]',
          },
        ],
        name: 'transferFromBatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'userAgreement',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '7439588dc058348fe50a3164cbc61e5da385b670c045f805ca8872ad993726b1',
    deprecated: true,
    delegated: false,
  },
  'issuance/ICedarClaimable.sol:ICedarClaimableV0': {
    id: 'issuance/ICedarClaimable.sol:ICedarClaimableV0',
    erc165Identifier: '0xc7ca953d',
    name: 'ICedarClaimableV0',
    file: 'issuance/ICedarClaimable.sol',
    dir: 'issuance',
    family: 'CedarClaimable',
    version: 0,
    abi: [
      {
        inputs: [
          {
            components: [
              {
                internalType: 'enum ICedarIssuanceV0.AuthType',
                name: 'authType',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'quantity',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'erc20TokenContract',
                type: 'address',
              },
              {
                internalType: 'bytes32[]',
                name: 'proof',
                type: 'bytes32[]',
              },
            ],
            internalType: 'struct ICedarClaimableV0.ClaimRequest',
            name: 'claimRequest',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'bytes32[]',
            name: 'proof',
            type: 'bytes32[]',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '3cc6701b53b1f1bfe31dca08d4cf2faec6e9e77c4fdaad466d749e5bbe7ea9ec',
    deprecated: true,
    delegated: false,
  },
  'issuance/ICedarERC20Payable.sol:ICedarERC20PayableV0': {
    id: 'issuance/ICedarERC20Payable.sol:ICedarERC20PayableV0',
    erc165Identifier: '0x44a2b7be',
    name: 'ICedarERC20PayableV0',
    file: 'issuance/ICedarERC20Payable.sol',
    dir: 'issuance',
    family: 'CedarERC20Payable',
    version: 0,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'erc20TokenContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'buy',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'erc20TokenContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
        ],
        name: 'buyAny',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '54d5157a120b416f41b673186e0abed736b5e4a5cd2736e0efbf5d660034e799',
    deprecated: true,
    delegated: false,
  },
  'issuance/ICedarIssuance.sol:ICedarIssuanceV0': {
    id: 'issuance/ICedarIssuance.sol:ICedarIssuanceV0',
    erc165Identifier: '0xecef8045',
    name: 'ICedarIssuanceV0',
    file: 'issuance/ICedarIssuance.sol',
    dir: 'issuance',
    family: 'CedarIssuance',
    version: 0,
    abi: [
      {
        inputs: [],
        name: 'authTypes',
        outputs: [
          {
            internalType: 'enum ICedarIssuanceV0.AuthType[]',
            name: '',
            type: 'uint8[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'issuanceModes',
        outputs: [
          {
            internalType: 'enum ICedarIssuanceV0.IssuanceMode[]',
            name: '',
            type: 'uint8[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paymentTypes',
        outputs: [
          {
            internalType: 'enum ICedarIssuanceV0.PaymentType[]',
            name: '',
            type: 'uint8[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '966662671f6f2ade2d60c591c985df741a205a91fbf9d46e204d00ff9a3be0c2',
    deprecated: true,
    delegated: false,
  },
  'issuance/ICedarIssuance.sol:ICedarIssuanceV1': {
    id: 'issuance/ICedarIssuance.sol:ICedarIssuanceV1',
    erc165Identifier: '0xc2985578',
    name: 'ICedarIssuanceV1',
    file: 'issuance/ICedarIssuance.sol',
    dir: 'issuance',
    family: 'CedarIssuance',
    version: 1,
    abi: [
      {
        inputs: [],
        name: 'foo',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    hash: '657c243e7ec570cbaed24536f29e55f2c0128a52e1881ccb6172d9dcc4c87d06',
    deprecated: true,
    delegated: false,
  },
  'issuance/ICedarIssuer.sol:ICedarIssuerV0': {
    id: 'issuance/ICedarIssuer.sol:ICedarIssuerV0',
    erc165Identifier: '0x867904b4',
    name: 'ICedarIssuerV0',
    file: 'issuance/ICedarIssuer.sol',
    dir: 'issuance',
    family: 'CedarIssuer',
    version: 0,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'issue',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '91c20011672ff5b9d6a1a276847d289915f34f10ea54c93a74b13e6cd5807d74',
    deprecated: true,
    delegated: false,
  },
  'issuance/ICedarNativePayable.sol:ICedarNativePayableV0': {
    id: 'issuance/ICedarNativePayable.sol:ICedarNativePayableV0',
    erc165Identifier: '0x2afaca20',
    name: 'ICedarNativePayableV0',
    file: 'issuance/ICedarNativePayable.sol',
    dir: 'issuance',
    family: 'CedarNativePayable',
    version: 0,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'buy',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    hash: '27b143aea04aa2d93bf0be3be8b3727156ec6cb7f82ce7d0061f07409beaa0dc',
    deprecated: true,
    delegated: false,
  },
  'issuance/ICedarOrderFiller.sol:ICedarOrderFillerV0': {
    id: 'issuance/ICedarOrderFiller.sol:ICedarOrderFillerV0',
    erc165Identifier: '0x692f5fe6',
    name: 'ICedarOrderFillerV0',
    file: 'issuance/ICedarOrderFiller.sol',
    dir: 'issuance',
    family: 'CedarOrderFiller',
    version: 0,
    abi: [
      {
        inputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'maker',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'taker',
                type: 'address',
              },
            ],
            internalType: 'struct IOrderV0.Order',
            name: 'order',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes',
          },
        ],
        name: 'fillOrder',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '983882788422bd2c4eaf4684c423141fcc56603eeab58976ed2dbce8ee3dc9cb',
    deprecated: true,
    delegated: false,
  },
  'lazymint/ICedarNFTLazyMint.sol:ICedarNFTLazyMintV0': {
    id: 'lazymint/ICedarNFTLazyMint.sol:ICedarNFTLazyMintV0',
    erc165Identifier: '0xd37c353b',
    name: 'ICedarNFTLazyMintV0',
    file: 'lazymint/ICedarNFTLazyMint.sol',
    dir: 'lazymint',
    family: 'CedarNFTLazyMint',
    version: 0,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'bytes',
            name: 'encryptedBaseURI',
            type: 'bytes',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
          {
            internalType: 'bytes',
            name: 'encryptedBaseURI',
            type: 'bytes',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'ee412d1fe3a2c3a6595b15e1542569492c7161c93264a9598aa94c2c500d4246',
    deprecated: true,
    delegated: false,
  },
  'lazymint/ICedarNFTLazyMint.sol:ICedarNFTLazyMintV1': {
    id: 'lazymint/ICedarNFTLazyMint.sol:ICedarNFTLazyMintV1',
    erc165Identifier: '0x47158264',
    name: 'ICedarNFTLazyMintV1',
    file: 'lazymint/ICedarNFTLazyMint.sol',
    dir: 'lazymint',
    family: 'CedarNFTLazyMint',
    version: 1,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '63e051dfc14f0d6ee01f2bce34c0e500eaa5f2c81ae44c632fcea2ec328ec692',
    deprecated: true,
    delegated: false,
  },
  'lazymint/ICedarSFTLazyMint.sol:ICedarSFTLazyMintV0': {
    id: 'lazymint/ICedarSFTLazyMint.sol:ICedarSFTLazyMintV0',
    erc165Identifier: '0x47158264',
    name: 'ICedarSFTLazyMintV0',
    file: 'lazymint/ICedarSFTLazyMint.sol',
    dir: 'lazymint',
    family: 'CedarSFTLazyMint',
    version: 0,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
        ],
        name: 'TokensLazyMinted',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'baseURIForTokens',
            type: 'string',
          },
        ],
        name: 'lazyMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '63e051dfc14f0d6ee01f2bce34c0e500eaa5f2c81ae44c632fcea2ec328ec692',
    deprecated: true,
    delegated: false,
  },
  'metadata/ICedarNFTMetadata.sol:ICedarNFTMetadataV0': {
    id: 'metadata/ICedarNFTMetadata.sol:ICedarNFTMetadataV0',
    erc165Identifier: '0xc87b56dd',
    name: 'ICedarNFTMetadataV0',
    file: 'metadata/ICedarNFTMetadata.sol',
    dir: 'metadata',
    family: 'CedarNFTMetadata',
    version: 0,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '46a2610eabb09129454f08d91c38a50ea53bd3545e1e0f6aa5d35dd2171e229c',
    deprecated: true,
    delegated: false,
  },
  'metadata/ICedarSFTMetadata.sol:ICedarSFTMetadataV0': {
    id: 'metadata/ICedarSFTMetadata.sol:ICedarSFTMetadataV0',
    erc165Identifier: '0x0e89341c',
    name: 'ICedarSFTMetadataV0',
    file: 'metadata/ICedarSFTMetadata.sol',
    dir: 'metadata',
    family: 'CedarSFTMetadata',
    version: 0,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'uri',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: '8a6de4fc9062d45f674ec93c9e47e4f82d96a83431b6894e27a1486a934bee59',
    deprecated: true,
    delegated: false,
  },
  'metadata/IContractMetadata.sol:ICedarMetadataV0': {
    id: 'metadata/IContractMetadata.sol:ICedarMetadataV0',
    erc165Identifier: '0x7b2de9fe',
    name: 'ICedarMetadataV0',
    file: 'metadata/IContractMetadata.sol',
    dir: 'metadata',
    family: 'CedarMetadata',
    version: 0,
    abi: [
      {
        inputs: [],
        name: 'contractURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'setContractURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    hash: 'efb8490d7b9fee46b1c867651d2ab4056551fadb10839ce1d2b699e283c45222',
    deprecated: true,
    delegated: false,
  },
} as const;
