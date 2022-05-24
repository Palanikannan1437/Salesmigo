import { useSession } from "next-auth/react";
import React from "react";
import DashBoard from "../components/DashBoard";

const CustomerAnalyticsPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      props.handleNavItems(3, "SIGN OUT", true);
    }
  }, [session]);
  return (
    <div>
      <DashBoard />
    </div>
  );
};

export default CustomerAnalyticsPage;
