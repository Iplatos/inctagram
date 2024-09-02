import { useState } from 'react';

import { Button } from '../Button';

type HederProps = {
  text: string;
};

export const TruncatedText = ({ text }: HederProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <div
        style={{
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: collapsed ? '3' : '',
          border: '2px solid red',

          display: '-webkit-box',
          overflow: 'hidden',
          position: 'relative',
          textOverflow: '',
          width: '300px',
        }}
      >
        {text}
        <span
          style={
            collapsed
              ? {
                  border: 0,
                  bottom: 0,
                  height: '1.44em',
                  padding: 0,
                  position: 'absolute',
                  right: 4,
                }
              : { border: 0, height: '1em', padding: 0 }
          }
        >
          <span
            style={
              collapsed
                ? {
                    bottom: 0,
                    display: 'inline-block',
                    height: '1.44em',

                    right: 4,

                    width: '24px',
                  }
                : { height: '1em' }
            }
          >
            {collapsed ? '...' : ' '}
          </span>

          <Button
            as={'a'}
            onClick={() => setCollapsed(!collapsed)}
            style={
              collapsed
                ? {
                    backgroundColor: 'black',
                    border: 0,

                    height: '1.44em',
                    overflow: 'hidden',
                    padding: 0,

                    width: 'max-content',
                  }
                : { border: 0, height: '1em', padding: 0 }
            }
            variant={'tertiary'}
          >
            {collapsed ? '  Show more' : 'Hide'}
          </Button>
        </span>
      </div>
    </div>
  );
};
