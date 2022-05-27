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

  return (
    <>
      <GeistProvider>
        <CssBaseline />
        <Menu query={searchQuery} />
        <div className="page__wrapper">
          <div className="page__content">
            <Grid.Container gap={2} marginTop={1} justify="flex-start">
              <Grid xs={24} sm={12} md={8}>
                <ProjectCard
                  productBrand="Zara"
                  framework="Zara Delhi"
                  newPurchase={{
                    repo: "palani",
                    commitMessage: "Bump version",
                  }}
                  updatedAt="4m"
                />
              </Grid>
              <Grid xs={24} sm={12} md={8}>
                <ProjectCard
                  productBrand="Nike"
                  framework="react"
                  productionHostname="Nike India"
                  newPurchase={{
                    repo: "palani",
                    commitMessage: "Improve homepage layout on smaller screens",
                  }}
                  updatedAt="2d"
                />
              </Grid>
              <Grid xs={24} sm={12} md={8}>
                <ProjectCard
                  productBrand="Levi's Mumbai"
                  framework="other"
                  updatedAt="5d"
                />
              </Grid>
              <Grid xs={24} sm={12} md={8}>
                <ProjectCard
                  productBrand="Zarageist"
                  framework="react"
                  productionHostname="random"
                  newPurchase={{
                    repo: "geist-org/react",
                    commitMessage: "chore: release v2.2.0",
                  }}
                  updatedAt="8d"
                />
              </Grid>
              <Grid xs={24} sm={12} md={8}>
                <ProjectCard
                  productBrand="ZaranewPurchasehub-blog"
                  framework="next"
                  productionHostname="newPurchasehub.blog"
                  newPurchase={{
                    repo: "newPurchasehub/blog",
                    commitMessage: "Random",
                  }}
                  updatedAt="8d"
                />
              </Grid>
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
