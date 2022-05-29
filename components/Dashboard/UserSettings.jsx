import React from "react";
import { Popover, Link } from "@geist-ui/react";

const UserSettings = () => (
  <>
    <Popover.Item title>
      <span>User Settings</span>
    </Popover.Item>
    <Popover.Item>
      <Link href="https://github.com/Palanikannan1437/Salesmigo">
        GitHub Frontend
      </Link>
    </Popover.Item>
    <Popover.Item>
      <Link href="https://github.com/Palanikannan1437/Salesmigo-backend">
        GitHub Backend
      </Link>
    </Popover.Item>
    <Popover.Item line />
  </>
);

export default UserSettings;
