import { MouseEventHandler, useMemo } from "react";
import source from "./source";

export type IconProps = { size?: number; color?: string; className?: string; src?: string; alt?: string, onClick?: MouseEventHandler<HTMLImageElement>; };
const Icon = ({
    name,
    ...props
}: IconProps & { name: keyof typeof source }) => {
    const IconSource = useMemo(() => source[name], [name]);
    return <IconSource {...props} />;
};

export default Icon;