import React from 'react';
import { Icon, SemanticCOLORS } from 'semantic-ui-react';
import { IconSizeProp } from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';

interface Props {
  isLoading: boolean;
  top?: string | number
  right?: string | number
  size?: IconSizeProp
  color?: SemanticCOLORS
}

const _LoadingComponent: React.FC<Props> = ({
  isLoading,
  top,
  right,
  size,
  color,
}): JSX.Element | null => {
  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: top ? top : '40%',
          right: right ? right : '50%',
          zIndex: 9999,
        }}
      >
        <Icon
          name="spinner"
          size={size ? size : ('5x' as IconSizeProp)}
          color={color}
          opacity={0.5}
          spin={true}
        />
      </div>
    );
  }
  return null;
};

export const LoadingComponent = React.memo(_LoadingComponent)
