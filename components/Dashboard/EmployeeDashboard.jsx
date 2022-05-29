import React, { useContext, useEffect } from "react";
import { GeistProvider, CssBaseline, useTheme } from "@geist-ui/react";
import Menu from "./Menu";
import Heading from "./Heading";
import { useSession } from "next-auth/react";
import AuthContext from "../../store/auth-context";
import MenuEmployee from "./MenuEmployee";

const EmployeeDashboard = () => {
  const theme = useTheme();
  const { data: session } = useSession();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");
  }, []);

  return (
    <div>
      <GeistProvider>
        <CssBaseline />
        <MenuEmployee />
        <Heading
          user={{
            photo: `${session?.user.image}`,
            name: `${session?.user.name}`,
            role: `${
              typeof window !== "undefined"
                ? localStorage.getItem("designation")
                : null
            }`,
            email: `${session?.user.email}`,
          }}
        />
        <div className="page__wrapper">
          <div className="page__content">
            <div className="projects"></div>
          </div>
        </div>
        <style jsx>{`
          .page__wrapper {
            background-color: ${theme.palette.accents_1};
          }
          .page__content {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: ${theme.layout.pageWidthWithMargin};
            max-width: 100%;
            margin: 0 auto;
            padding: 0 ${theme.layout.pageMargin};
            transform: translateY(-35px);
            box-sizing: border-box;
          }
          .projects {
            width: 540px;
            max-width: 100%;
            margin-right: calc(4 * ${theme.layout.gap});
          }
          .projects :global(.project__wrapper):not(:last-of-type) {
            margin-bottom: calc(1.5 * ${theme.layout.gap});
          }
          .recent-activity {
            flex: 1;
          }
          .recent-activity :global(.recent-activity__title) {
            font-size: 0.875rem;
            font-weight: 700;
            margin: 0 0 calc(3 * ${theme.layout.gapHalf});
          }
          .page__content :global(.view-all) {
            font-size: 0.875rem;
            font-weight: 700;
            margin: calc(1.5 * ${theme.layout.gap}) 0;
            text-align: center;
          }
          @media (max-width: ${theme.breakpoints.sm.max}) {
            .page__content {
              flex-direction: column;
              justify-content: flex-start;
              align-items: stretch;
            }
            .projects {
              width: 100%;
              margin-right: unset;
            }
          }
        `}</style>
      </GeistProvider>
    </div>
  );
};

export default EmployeeDashboard;
