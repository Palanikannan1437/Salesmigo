import React, { useEffect, useState } from "react";
import { Grid, useTheme, GeistProvider, CssBaseline } from "@geist-ui/react";
import ProjectCard from "../../../components/Dashboard/ProjectCard";
import Menu from "../../../components/Dashboard/Menu";
import { useRouter } from "next/router";

const Page = () => {
  const theme = useTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!router.isReady) return;
    setSearchQuery(router.query["recommendationEmail"]);
  }, [router.isReady]);

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/aisles/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: router.query["recommendationEmail"],
          scenario: "Fashion-Items-to-User",
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
  }, [router.isReady]);

  return (
    <>
      <GeistProvider>
        <CssBaseline />
        <Menu query={searchQuery} />
        <div className="page__wrapper">
          <div className="page__content">
            <Grid.Container gap={2} marginTop={1} justify="flex-start">
              {recommendations.length > 0
                ? recommendations.map((recommendation, idx) => {
                    return (
                      <Grid xs={24} sm={12} md={8} key={idx}>
                        <ProjectCard
                          productBrand={recommendation.id.split(/(?=[A-Z])/)[0]}
                          newPurchase={{
                            repo: recommendation.id
                              .split(/(?=[A-Z])/)
                              .join(" "),
                            commitMessage: recommendation.values.description,
                          }}
                          updatedAt={recommendation.values.price}
                          color={recommendation.values.color}
                          title={recommendation.id.split(/(?=[A-Z])/).join(" ")}
                        />
                      </Grid>
                    );
                  })
                : null}
            </Grid.Container>
          </div>
        </div>
        <style jsx>{`
          .page__wrapper {
            background-color: ${theme.palette.accents_1};
            min-height: calc(100vh - 172px);
          }
          .page__content {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: ${theme.layout.pageWidthWithMargin};
            max-width: 100%;
            margin: 0 auto;
            padding: calc(${theme.layout.unit} * 2) ${theme.layout.pageMargin};
            box-sizing: border-box;
          }
          .actions-stack {
            display: flex;
            width: 100%;
          }
          .actions-stack :global(.input-wrapper) {
            background-color: ${theme.palette.background};
          }
          .actions-stack :global(input) {
            font-size: 14px;
          }
        `}</style>
      </GeistProvider>
    </>
  );
};
export default Page;
