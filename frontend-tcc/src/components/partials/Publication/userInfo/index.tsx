import React from "react";

export default function UserInfo() {
    return (
        <div className="flex gap-6 items-center">
            <img
                className="rounded-full aspect-square object-cover w-12 md:w-16 mb-2 cursor-pointer"
                src="/garoto.jpg"
                alt=""
            />
            <div>
                <p>Leonardo Fontes</p>
                <span className="text-gray text-sm">Cubatão</span>
            </div>
        </div>
    );
}
