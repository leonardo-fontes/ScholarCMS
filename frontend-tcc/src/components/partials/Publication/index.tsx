import React from "react";
import UserInfo from "./userInfo";
import ImageComponent from "./imageComponent";
import Comments from "./comments";

export default function Publication() {
    return (
        <div className="flex flex-col w-[32%] mt-20">
            <UserInfo />
            <ImageComponent
                src="/garotos.jpg"
                subtitle="Doe pra criançadaDoe pra criançadaDoe pra criançadaDoe pra criançadaDoe pra criançadaDoe pra criançadaDoe pra criançada"
            />
            <Comments />
        </div>
    );
}
