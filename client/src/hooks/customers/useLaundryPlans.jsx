import React, { useState } from "react";
import useAuth from "../../contexts/AuthContext";

const useLaundryPlans = () => {
  const { userDetails } = useAuth();
  const { name, setName } = useState(userDetails.fullname);

  return { name, setName };
};

export default useLaundryPlans;
