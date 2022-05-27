import React from "react";
import { Popover, Link } from "@geist-ui/react";

const UserSettings = () => (
  <>
    <Popover.Item title>
      <span>User Settings</span>
    </Popover.Item>
    <Popover.Item>
      <Link href="#">Teams</Link>
    </Popover.Item>
    <Popover.Item>
      <Link href="https://github.com/ofekashery/react-dashboard-design">
        GitHub
      </Link>
    </Popover.Item>
    <Popover.Item line />
  </>
);

export default UserSettings;
