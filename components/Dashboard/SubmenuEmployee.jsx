import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Tabs, useTheme } from "@geist-ui/react";
import Link from "next/link";
import { Button } from "@mui/material";

const SubmenuEmployee = () => {
  const theme = useTheme();
  const router = useRouter();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const scrollHandler = () =>
      setSticky(document.documentElement.scrollTop > 204);
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [setSticky]);

  return (
    <>
      <nav className="submenu__wrapper">
        <div className={`submenu ${sticky ? "submenu_sticky" : ""}`}>
          <div className="submenu__inner">
            <Tabs
              onChange={(route) => {
                router.push(route);
              }}
            >
              {typeof window !== "undefined" &&
              localStorage.getItem("designation") === "Manager" ? (
                <Tabs.Item label="Register Worker" value="/register-worker" />
              ) : null}

              {typeof window !== "undefined" &&
              localStorage.getItem("designation") === "Worker" ? (
                <Tabs.Item label="Your Room" value="/worker-allocations" />
              ) : null}

              {typeof window !== "undefined" &&
              localStorage.getItem("designation") === "Manager" ? (
                <Tabs.Item label="Your Room" value="/customer-allocator" />
              ) : null}

              <Tabs.Item
                label="Face-Recognition At Entrance"
                value="/face-detection"
              />
              <Tabs.Item
                label="Emotion-Detection At Aisles"
                value="/aisle-emotion-detection"
              />
              <Tabs.Item label="Gesture-Detection" value="/gesture-detection" />

              <Tabs.Item label="Register Customer" value="/register-customer" />
            </Tabs>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .submenu__wrapper {
          height: 48px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 -1px ${theme.palette.border};
        }
        .submenu_sticky {
          transition: box-shadow 0.2s ease;
        }
        .submenu_sticky {
          position: fixed;
          z-index: 1100;
          top: 0;
          right: 0;
          left: 0;
          background: ${theme.palette.background};
          box-shadow: ${theme.type === "dark"
            ? `inset 0 -1px ${theme.palette.border}`
            : "rgba(0, 0, 0, 0.1) 0 0 15px 0"};
        }
        .submenu__inner {
          display: flex;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          height: 48px;
          box-sizing: border-box;
          overflow-y: hidden;
          overflow-x: auto;
          overflow: -moz-scrollbars-none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          box-sizing: border-box;
        }
        .submenu__inner::-webkit-scrollbar {
          display: none;
        }
        .submenu__inner :global(.content) {
          display: none;
        }
        .submenu__inner :global(.tabs),
        .submenu__inner :global(header) {
          height: 100%;
          border: none;
        }
        .submenu__inner :global(.tab) {
          height: calc(100% - 2px);
          padding-top: 0;
          padding-bottom: 0;
          color: ${theme.palette.accents_5};
          font-size: 0.875rem;
        }
        .submenu__inner :global(.tab):hover {
          color: ${theme.palette.foreground};
        }
        .submenu__inner :global(.active) {
          color: ${theme.palette.foreground};
        }
      `}</style>
    </>
  );
};

export default SubmenuEmployee;
