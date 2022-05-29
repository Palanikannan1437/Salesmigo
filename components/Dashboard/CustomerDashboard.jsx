import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  GeistProvider,
  CssBaseline,
  Link,
  Text,
  useTheme,
} from "@geist-ui/react";
import Menu from "./Menu";
import Heading from "./Heading";
import { useRouter } from "next/router";
import EventListItem from "./ActivityEvent";
import OverviewProject from "./OverviewProject";
import { timeAgo } from "../../utils/timeAgo";

const CustomerDashboard = () => {
  const theme = useTheme();
  const router = useRouter();

  const [recentPurchases, setRecentPurchases] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/aisles/purchases/${router.query["customeremail"]}`
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

  useEffect(() => {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    setSearchQuery(router.query["customeremail"]);
  }, [router.isReady]);

  return (
    <div>
      <GeistProvider>
        <CssBaseline />
        <Menu path={router.asPath} query={searchQuery} />
        <Heading
          user={{
            name: `${router.query["customeremail"]?.match(/^([^@]*)@/)[1]}`,
            role: "Customer",
            email: `${router.query["customeremail"]}`,
          }}
        />
        <div className="page__wrapper">
          <div className="page__content">
            <div className="projects">
              <div style={{ marginBottom: "30px" }}>
                <OverviewProject
                  hasPurchased={recentPurchases.length > 0}
                  query={searchQuery}
                  projectId="Recommended Purchases"
                  typeOfRecommendation={
                    recentPurchases.length > 0
                      ? "Recommendations Based on User's Previous Purchases"
                      : "Based on General Trends"
                  }
                />
              </div>
              <div style={{ marginBottom: "30px" }}>
                <OverviewProject
                  projectId="Recommendations Based on Reactions"
                  repo="birthdays,etc"
                  createdAt="5d"
                  query={searchQuery}
                />
              </div>
              <div style={{ marginBottom: "30px" }}>
                <OverviewProject
                  projectId="Recommendations Based on Gestures"
                  repo="birthdays,etc"
                  createdAt="5d"
                  query={searchQuery}
                />
              </div>
              <div style={{ marginBottom: "30px" }}>
                <OverviewProject
                  projectId="Favorite Brands and Items"
                  typeOfRecommendation="Recommendations of User's Brand Favorites"
                  query={searchQuery}
                />
              </div>

              <NextLink href="/projects" passHref>
                <Link className="view-all" color underline>
                  View All Purchases
                </Link>
              </NextLink>
            </div>
            <div className="recent-activity">
              <Text h2 className="recent-activity__title">
                Recent Purchases
              </Text>

              {recentPurchases.length > 0 ? (
                recentPurchases.map((purchase, idx) => {
                  return (
                    <EventListItem
                      key={idx}
                      username={purchase.itemId.split(/(?=[A-Z])/).join(" ")}
                      avatar={`https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1495105787522-5334e3ffa0ef`}
                      createdAt={timeAgo(purchase.timestamp)}
                    >
                      {purchase.itemId.split(/(?=[A-Z])/).join(" ")}
                    </EventListItem>
                  );
                })
              ) : (
                <h2>No Purchases Yet</h2>
              )}
              <NextLink href="/activity" passHref>
                <Link className="view-all" color underline>
                  View All Activity
                </Link>
              </NextLink>
            </div>
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
            margin-bottom: 100px;
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

export default CustomerDashboard;
