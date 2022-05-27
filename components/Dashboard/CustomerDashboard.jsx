import React, { useEffect, useState } from "react";
import Head from "next/head";
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

const CustomerDashboard = () => {
  const theme = useTheme();
  const router = useRouter();
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
              <OverviewProject
                projectId="Recommended Purchases"
                repo="recommended purchases"
                createdAt="4m"
              />
              <OverviewProject
                projectId="Favorite Brands"
                repo="brands liked by the customer"
                createdAt="2d"
              />
              <OverviewProject
                projectId="Upcoming Occasions"
                repo="birthdays,etc"
                createdAt="5d"
              />
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
              <EventListItem
                username="palani"
                avatar="https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1497339100210-9e87df79c218"
                createdAt="4m"
              >
                Black Coat from Zara
              </EventListItem>
              <EventListItem
                username="dependabot"
                avatar="https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1518002171953-a080ee817e1f"
                createdAt="2d"
              >
                Black Shoes from Addidas
              </EventListItem>
              <EventListItem
                username="palani"
                avatar="https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1620799140408-edc6dcb6d633"
                createdAt="3d"
              >
                White Top from FBB
              </EventListItem>
              <EventListItem
                username="palani"
                avatar={
                  "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1567721571968-266680c30815"
                }
                createdAt="9d"
              >
                White Shirt from Zara
              </EventListItem>
              <EventListItem
                username="palani"
                avatar={
                  "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1495105787522-5334e3ffa0ef"
                }
                createdAt="9d"
              >
                Blue Jacket from Zara
              </EventListItem>
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
