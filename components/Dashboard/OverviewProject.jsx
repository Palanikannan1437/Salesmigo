import React, { useEffect, useState } from "react";
import { Button, Text, Link, Card, Dot, Tag, useTheme } from "@geist-ui/react";

const OverviewProject = ({
  projectId,
  typeOfRecommendation,
  query,
  hasPurchased,
}) => {
  const theme = useTheme();

  const [recommendations, setRecommendations] = useState([]);

  //getting recommendations of the user based on previous purchases
  useEffect(() => {
    if (
      query &&
      (projectId === "Recommended Purchases" || projectId === "Favorite Brands and Items")
    ) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/aisles/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: query,
          scenario: hasPurchased
            ? "Fashion-Items-to-User"
            : "ItemsToUserGeneral",
        }),
      })
        .then((response) => {
          if (response.status === 404) {
            // router.push("/error-page");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.recommendedItems.recomms);
          setRecommendations(data.recommendedItems.recomms);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query,hasPurchased]);

  useEffect(() => {
    if (query && projectId === "Recommendations Based on Reactions") {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/aisles/recommendations-emotions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: query,
          }),
        }
      )
        .then((response) => {
          if (response.status === 404) {
            // router.push("/error-page");
          }
          return response.json();
        })
        .then((data) => {
          if (data.recommendation) {
            setRecommendations(data.recommendation);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query]);

  useEffect(() => {
    if (query && projectId === "Recommendations Based on Gestures") {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/aisles/recommendations-gestures`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: query,
          }),
        }
      )
        .then((response) => {
          if (response.status === 404) {
            // router.push("/error-page");
          }
          return response.json();
        })
        .then((data) => {
          if (data.recommendation) {
            setRecommendations(data.recommendation);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query]);

  return (
    <>
      <div className="recommendation__wrapper">
        <Card className="project__card" shadow>
          <div className="project__title">
            <Text h3>{projectId}</Text>
          </div>
          <div>
            {projectId === "Recommended Purchases" && recommendations.length > 0
              ? recommendations.map((recommendation, idx) => {
                  return (
                    <Dot
                      key={idx}
                      className="project__deployment"
                      type="success"
                    >
                      <Link href="#">
                        {recommendation.id.split(/(?=[A-Z])/).join(" ")}
                      </Link>
                      <Tag
                        className="project__environment-tag"
                        type="secondary"
                      >
                        Aisle -{" "}
                        {recommendation.id.split(/(?=[A-Z])/)[0].toLowerCase()}
                      </Tag>
                    </Dot>
                  );
                })
              : null}

            {projectId === "Favorite Brands and Items"
              ? recommendations.map((recommendation, idx) => {
                  return (
                    <Dot
                      key={idx}
                      className="project__deployment"
                      type="success"
                    >
                      <Link href="#">
                        {recommendation.id.split(/(?=[A-Z])/)[0] +
                          " " +
                          recommendation.id.split(/(?=[A-Z])/)[
                            recommendation.id.split(/(?=[A-Z])/).length - 1
                          ]}
                      </Link>
                    </Dot>
                  );
                })
              : null}

            {projectId === "Recommendations Based on Reactions" &&
            recommendations.length > 0
              ? recommendations.map((recommendation, idx) => {
                  return (
                    <Dot
                      key={idx}
                      className="project__deployment"
                      type="success"
                    >
                      <Link href="#">{recommendation.aisleName}</Link>
                      <Tag
                        className="project__environment-tag"
                        type="secondary"
                      >
                        Aisle - {recommendation.aisleName}
                      </Tag>
                    </Dot>
                  );
                })
              : null}

            {projectId === "Recommendations Based on Gestures" &&
            recommendations.length > 0
              ? recommendations.map((recommendation, idx) => {
                  return (
                    <Dot
                      key={idx}
                      className="project__deployment"
                      type="success"
                    >
                      <Link href="#">{recommendation.aisleName}</Link>
                      <Tag
                        className="project__environment-tag"
                        type="secondary"
                      >
                        Aisle - {recommendation.aisleName}
                      </Tag>
                    </Dot>
                  );
                })
              : null}
          </div>
          <Card.Footer className="project__footer">
            <Text className="recommendation__type">{typeOfRecommendation}</Text>
          </Card.Footer>
        </Card>
      </div>
      <style jsx>{`
        .recommendation__wrapper :global(.project__card) {
          padding: 0 !important;
        }
        .project__title {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: ${theme.layout.gap};
        }
        .project__title :global(h3) {
          margin: 0;
        }
        .recommendation__wrapper :global(.project__deployment) {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: ${theme.layout.gapQuarter};
        }
        .recommendation__wrapper :global(.project__deployment) :global(.icon) {
          background-color: #50e3c2;
        }
        .recommendation__wrapper :global(.project__deployment) :global(.label) {
          display: flex;
          align-items: center;
          flex: 1;
          overflow: hidden;
          text-transform: unset;
        }
        .recommendation__wrapper :global(.project__deployment) :global(a) {
          font-size: 0.875rem;
          font-weight: 500;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .recommendation__wrapper :global(.project__environment-tag) {
          color: ${theme.palette.foreground};
          background: ${theme.palette.accents_1};
          border-color: ${theme.palette.accents_2};
          border-radius: 1rem;
          padding: 2px 6px;
          height: unset;
          font-size: 0.75rem;
          font-weight: 500;
          margin-left: ${theme.layout.gapHalf};
        }
        .recommendation__wrapper :global(.project__created-at) {
          color: ${theme.palette.accents_4};
          font-size: 0.875rem;
          text-align: right;
          margin: 0 0 0 ${theme.layout.gapHalf};
        }
        .recommendation__wrapper :global(.project__footer) {
          display: flex;
          align-items: center;
          font-weight: 500;
        }
        .recommendation__wrapper :global(.recommendation__type) {
          font-size: 0.875rem;
          font-weight: 500;
          margin-left: ${theme.layout.gapQuarter};
        }
        @media (max-width: ${theme.breakpoints.xs.max}) {
          .recommendation__wrapper :global(.project__visit-button) {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default OverviewProject;
