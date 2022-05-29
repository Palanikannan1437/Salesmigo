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
    setSearchQuery(router.query["purchasesEmail"]);
  }, [router.isReady]);

  const [recentPurchases, setRecentPurchases] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/aisles/purchases/${router.query["purchasesEmail"]}`
      )
        .then((response) => {
          if (response.status === 404) {
            // router.push("/error-page/");
          }
          return response.json();
        })
        .then((data) => {
          if (data.purchases) {
            setRecentPurchases(data.purchases);
          }
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
              {recentPurchases.length > 0
                ? recentPurchases.map((purchase, idx) => {
                    return (
                      <Grid xs={24} sm={12} md={8} key={idx}>
                        <ProjectCard
                          productBrand={purchase.itemId.split(/(?=[A-Z])/)[0]}
                          newPurchase={{
                            repo: purchase.itemId.split(/(?=[A-Z])/).join(" "),
                            commitMessage: "Random Info",
                          }}
                          color={purchase.itemId.split(/(?=[A-Z])/)[1]}
                          title={purchase.itemId.split(/(?=[A-Z])/).join(" ")}
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
