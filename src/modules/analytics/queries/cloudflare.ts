import { gql, type TypedDocumentNode } from '@apollo/client';

type ViewerTotalResponse = {
  viewer: {
    accounts: Array<{
      total: Array<{
        count: number;
        avg: {
          sampleInterval: number;
        };
        sum: {
          visits: number;
        };
      }>;
    }>;
  };
};

type ViewerTotalVariables = {
  hosts: string[];
  siteTag: string;
  endDate: string;
  startDate: string;
  accountTag: string;
};

export type ViewerTotalQueryResult = TypedDocumentNode<
  ViewerTotalResponse,
  ViewerTotalVariables
>;

export const ViewerTotalQuery: ViewerTotalQueryResult = gql`
  query ViewerTotal(
    $accountTag: string!
    $siteTag: string!
    $hosts: [string!]
    $startDate: Time!
    $endDate: Time!
  ) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        total: rumPageloadEventsAdaptiveGroups(
          limit: 1
          filter: {
            AND: [
              { datetime_geq: $startDate, datetime_leq: $endDate }
              { bot: 0 }
              { siteTag_in: [$siteTag] }
              { requestHost_in: $hosts }
            ]
          }
        ) {
          count
          avg {
            sampleInterval
          }
          sum {
            visits
          }
        }
      }
    }
  }
`;

/* ///////////////////////////////////////////////// */

type ViewerLastAccessResponse = {
  viewer: {
    accounts: Array<{
      lastAccess: Array<{
        count: number;
        sum: {
          visits: number;
        };
        dimensions: {
          datetimeMinute: string;
          countryName: string;
        };
      }>;
    }>;
  };
};

type ViewerLastAccessVariables = {
  hosts: string[];
  siteTag: string;
  endDate: string;
  startDate: string;
  accountTag: string;
};

export type ViewerLastAccessQueryResult = TypedDocumentNode<
  ViewerLastAccessResponse,
  ViewerLastAccessVariables
>;

export const ViewerLastAccessQuery: ViewerLastAccessQueryResult = gql`
  query ViewerLastAccess(
    $accountTag: string!
    $siteTag: string!
    $hosts: [string!]
    $startDate: Time!
    $endDate: Time!
  ) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        lastAccess: rumPageloadEventsAdaptiveGroups(
          limit: 1
          orderBy: [datetimeMinute_DESC]
          filter: {
            AND: [
              { datetime_geq: $startDate, datetime_leq: $endDate }
              { bot: 0 }
              { siteTag_in: [$siteTag] }
              { requestHost_in: $hosts }
            ]
          }
        ) {
          count
          sum {
            visits
          }
          dimensions {
            countryName
            datetimeMinute
          }
        }
      }
    }
  }
`;
