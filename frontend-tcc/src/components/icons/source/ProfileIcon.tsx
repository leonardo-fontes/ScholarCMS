import React from 'react'
import { IconProps } from '..';

const ProfileIcon = ({ size = 50, className, alt = "Imagem de perfil", src, onClick }: IconProps) => {
  return (
    <img
      className={`cursor-pointer rounded-full ${className}`}
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: 'cover' }}
      onClick={onClick}
    />
  );
};
export default ProfileIcon;