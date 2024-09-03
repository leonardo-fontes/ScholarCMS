import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';

interface IconProps {
  size?: number;
  className?: string;
  alt?: string;
  onClick?: () => void;
  to: string;
}

const HomeIconComponent: React.FC<IconProps> = ({ size = 50, className = '', onClick, to }) => {
  return (
    <Link to={to}>
      <Home
        className={`cursor-pointer ${className}`}
        style={{ fontSize: size }}
        onClick={onClick}
        aria-label="Imagem do mapa"
      />
    </Link>
  );
};
export default HomeIconComponent;
