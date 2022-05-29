import React from "react";
import {
  Avatar,
  Button,
  Text,
  Link,
  Card,
  Dot,
  Tag,
  useTheme,
} from "@geist-ui/react";

const ProjectCard = ({
  productBrand,
  productionHostname,
  updatedAt,
  newPurchase,
  title,
  color,
}) => {
  const theme = useTheme();

  return (
    <>
      <div className="project__wrapper">
        <Card className="project__card" shadow>
          <div className="project-title__wrapper">
            <Avatar
              src={`/customer.png`}
              height={1.25}
              width={1.25}
              marginRight={0.75}
              className="project-icon"
            />
            <div className="project-title__content">
              <Text
                margin={0}
                style={{ fontWeight: 500, lineHeight: "1.5rem" }}
              >
                {productBrand}
              </Text>
              <Text
                margin={0}
                font="0.875rem"
                style={{
                  color: theme.palette.accents_6,
                  lineHeight: "1.25rem",
                }}
              >
                {productionHostname || `${title}`}
              </Text>
            </div>
          </div>
          {newPurchase ? (
            <div className="project-newPurchase-commit">
              <Text
                margin={0}
                style={{ color: theme.palette.accents_6, fontWeight: 500 }}
              >
                {newPurchase?.commitMessage}
              </Text>
            </div>
          ) : (
            <div className="project-newPurchase-commit-error">
              No newPurchase Repository connected.
            </div>
          )}
          <Text
            marginBottom={0}
            font="0.875rem"
            style={{ color: theme.palette.accents_5 }}
          >
            {updatedAt}
            {
              <>
                {" "}
                <Dot>{">"}</Dot>
                {color}
              </>
            }
          </Text>
        </Card>
      </div>
      <style jsx>{`
        .project__wrapper {
          width: 100%;
        }
        .project__wrapper :global(.project__card) {
          box-shadow: ${theme.type === "dark"
            ? theme.expressiveness.shadowSmall
            : "0px 2px 4px rgba(0,0,0,0.1)"};
        }
        .project__wrapper :global(.project__card):hover {
          box-shadow: ${theme.type === "dark"
            ? `0 0 0 1px ${theme.palette.foreground}`
            : "0px 4px 8px rgba(0,0,0,0.12)"};
        }
        .project-title__wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .project-title__wrapper :global(.project-icon) {
          background: #fff;
          border-radius: 50%;
          border: ${theme.type === "dark"
            ? `1px solid ${theme.palette.foreground}`
            : "none"};
        }
        .project-newPurchase-commit,
        .project-newPurchase-commit-error {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 3rem;
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        .project-newPurchase-commit-error {
          padding: 0 ${theme.layout.unit};
          border-radius: ${theme.layout.radius};
          background: ${theme.palette.accents_1};
          border: 1px solid ${theme.palette.border};
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </>
  );
};

export default ProjectCard;
