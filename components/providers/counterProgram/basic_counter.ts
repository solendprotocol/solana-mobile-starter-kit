export type BasicCounter = {
  version: '0.1.0';
  name: 'basic_counter';
  instructions: [
    {
      name: 'initialize';
      accounts: [
        {
          name: 'counter';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'increment';
      accounts: [
        {
          name: 'counter';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: 'counter';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'count';
            type: 'u64';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'Unauthorized';
      msg: 'You are not authorized to perform this action.';
    },
    {
      code: 6001;
      name: 'CannotGetBump';
      msg: 'Cannot get the bump.';
    },
  ];
};

export const IDL: BasicCounter = {
  version: '0.1.0',
  name: 'basic_counter',
  instructions: [
    {
      name: 'initialize',
      accounts: [
        {
          name: 'counter',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'increment',
      accounts: [
        {
          name: 'counter',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'counter',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'count',
            type: 'u64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'Unauthorized',
      msg: 'You are not authorized to perform this action.',
    },
    {
      code: 6001,
      name: 'CannotGetBump',
      msg: 'Cannot get the bump.',
    },
  ],
};
