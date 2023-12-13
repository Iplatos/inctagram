import { useState } from 'react';

type AvatarType = {
  disabled?: boolean;
  photo: string;
  size?: number;
};

export const Avatar = (props: AvatarType) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const { disabled } = props;
  const handleMouseDown = e => {
    if (disabled) {
      return;
    }
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = e => {
    if (!isDragging) {
      return;
    }
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        left: `${position.x}px`,
        position: 'absolute',
        top: `${position.y}px`,
      }}
    >
      <img
        alt={'Avatar'}
        src={props.photo}
        style={{ backGroundClip: 'paddingBox', width: props.size, zIndex: -121 }}
      />
    </div>
  );
};
