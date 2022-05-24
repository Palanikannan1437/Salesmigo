import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import DashBoard from "../components/DashBoard";

const CustomerAnalyticsPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <DashBoard />
    </div>
  );
};

export default CustomerAnalyticsPage;
