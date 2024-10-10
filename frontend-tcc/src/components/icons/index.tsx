import { useMemo } from "react";
import source from "./source";

export type IconProps = { size?: number; color?: string; className?: string };
const Icon = ({
    name,
    ...props
}: IconProps & { name: keyof typeof source }) => {
    const IconSource = useMemo(() => source[name], [name]);
    return <IconSource {...props} />;
};

export default Icon;