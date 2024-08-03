import React from "react";
import profileImage from "../../assets/images/119657882.jfif";

const UserImage = () => {
  return (
    <span className="userImage flex w-[40px] h-[40px] overflow-hidden cursor-pointer">
      <img src={profileImage} className="w-[100%] h-[100%] object-cover" />
    </span>
  );
};

export default UserImage;
