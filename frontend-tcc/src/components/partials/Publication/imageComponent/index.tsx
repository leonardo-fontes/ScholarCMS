import React from "react";
import Button from "../../../inputs/Button";

interface ImageComponent {
    src: string;
    subtitle?: string;
}

export default function ImageComponent({ src, subtitle }: ImageComponent) {
    return (
        <div className="w-full">
            <p className="text-sm my-3">{subtitle || ""}</p>
            <div className="relative min-w-full border-2 border-lightGray">
                <img
                    className="w-full aspect-square object-cover"
                    src={src}
                    alt="foto do usuário"
                />
                <Button
                    children="DOAR"
                    classname="absolute bottom-8 right-8 text-lg md:text-xl text-white bg-primary px-6 md:px-8 py-1 md:py-2 font-extrabold"
                />
            </div>
        </div>
    );
}
