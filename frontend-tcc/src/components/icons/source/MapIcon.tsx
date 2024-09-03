import React from 'react';
import MapIcon from '@mui/icons-material/Map';
import { Link } from 'react-router-dom';

interface IconProps {
  size?: number;
  className?: string;
  alt?: string;
  onClick?: () => void;
  to: string;
}

const MapaIcon: React.FC<IconProps> = ({ size = 50, className = '', onClick, to }) => {
  return (
    <Link to={to}>
      <MapIcon
        className={`cursor-pointer ${className}`}
        style={{ fontSize: size }}
        onClick={onClick}
        aria-label="Imagem do mapa"
      />
    </Link>
  );
};
export default MapaIcon;
