import { IconProps } from "../index";

const Logo = ({ size = 24, color = "#800D0D", className }: IconProps) => {
    return (
        <svg
            className={className}
            width={size}
            height={size * 0.28}
            viewBox={`0 0 ${size * 4.3} ${size * 1.2}`}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={size * 0.7}
                fill='white'
                fontFamily="Arial, sans-serif"
                fontWeight='bold'
            >
                SOLIDARIZA
            </text>
        </svg>
    );
};

export default Logo;
