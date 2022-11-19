import React, { useCallback, useState } from 'react';

//invoke mouseLeave when leave all children
//TODO: 传入ele作为值
interface IOption {
  initialValue?: boolean;
  onHover?: <T>(e: React.MouseEvent<T>) => Promise<void>;
  onLeave?: <T>(e: React.MouseEvent<T>) => Promise<void>;
}

export const useHover = (option?: IOption) => {
  const { initialValue = false, onHover, onLeave } = option || {};
  const [hovered, setHovered] = useState(initialValue);

  const onMouseEnter = useCallback(
    async <T>(e: React.MouseEvent<T>) => {
      setHovered(true);
      await onHover?.(e);
    },
    [setHovered, onHover]
  );

  const onMouseLeave = useCallback(
    async <T>(e: React.MouseEvent<T>) => {
      setHovered(false);
      await onLeave?.(e);
    },
    [onLeave, setHovered]
  );

  return {
    hovered,
    onMouseEnter,
    onMouseLeave,
  };
};
