export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_subscriptionPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_subscriptionDuration",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "creatorAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "creatorName",
        type: "string",
      },
    ],
    name: "CreatorRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "songId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "songName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "SongUploaded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "subscriptionEnd",
        type: "uint256",
      },
    ],
    name: "Subscribed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    name: "UserRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "checkSubscription",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "creators",
    outputs: [
      {
        internalType: "address",
        name: "creatorAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "creatorName",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllSongs",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "songId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "songName",
            type: "string",
          },
          {
            internalType: "string",
            name: "songUrl",
            type: "string",
          },
          {
            internalType: "string",
            name: "songImage",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
        ],
        internalType: "struct SpotifyClone.Song[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_creatorAddress",
        type: "address",
      },
    ],
    name: "getCreatorInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creatorAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "creatorName",
            type: "string",
          },
          {
            internalType: "uint256[]",
            name: "uploadedSongs",
            type: "uint256[]",
          },
        ],
        internalType: "struct SpotifyClone.Creator",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_songId",
        type: "uint256",
      },
    ],
    name: "getSongInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "songId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "songName",
            type: "string",
          },
          {
            internalType: "string",
            name: "songUrl",
            type: "string",
          },
          {
            internalType: "string",
            name: "songImage",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
        ],
        internalType: "struct SpotifyClone.Song",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "getUserInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isSubscribed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "subscriptionEnd",
            type: "uint256",
          },
        ],
        internalType: "struct SpotifyClone.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_creatorName",
        type: "string",
      },
    ],
    name: "registerCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_subscriptionDuration",
        type: "uint256",
      },
    ],
    name: "setSubscriptionDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_subscriptionPrice",
        type: "uint256",
      },
    ],
    name: "setSubscriptionPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "songCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "songs",
    outputs: [
      {
        internalType: "uint256",
        name: "songId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "songName",
        type: "string",
      },
      {
        internalType: "string",
        name: "songUrl",
        type: "string",
      },
      {
        internalType: "string",
        name: "songImage",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_songName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_songUrl",
        type: "string",
      },
      {
        internalType: "string",
        name: "_songImage",
        type: "string",
      },
    ],
    name: "uploadSong",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isSubscribed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "subscriptionEnd",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
