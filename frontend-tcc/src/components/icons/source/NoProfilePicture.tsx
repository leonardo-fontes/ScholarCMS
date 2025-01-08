interface NoProfilePictureProps {
  className?: string;
}

const NoProfilePicture = ({ className }: NoProfilePictureProps) => {
  return (
    <svg
      className={className}
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#E0E0E0" />
      <path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        fill="#BDBDBD"
      />
      <path
        d="M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
        fill="#BDBDBD"
      />
    </svg>
  );
};

export default NoProfilePicture;
