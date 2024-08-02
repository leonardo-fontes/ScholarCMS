import { IconProps } from "../index";

const Clear = ({ size = 12, color = "#800D0D", className }: IconProps) => {
  return (
    <svg
    className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 5L19 19M5 19L19 5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Clear;
