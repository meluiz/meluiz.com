import { gql, type TypedDocumentNode } from '@apollo/client';

type ViewerTotalResponse = {
  viewer: {
    accounts: Array<{
      total: Array<{
        count: number;
        sum: {
          visits: number;
        };
        dimensions?: {
          countryName?: string;
          datetimeMinute?: string;
        };
      }>;
    }>;
  };
};

type ViewerTotalVariables = {
  accountTag: string;
  siteTag: string;
  startDate: string;
  endDate: string;
};

export type ViewerTotalQueryResult = TypedDocumentNode<
  ViewerTotalResponse,
  ViewerTotalVariables
>;

export const ViewerTotalQuery: ViewerTotalQueryResult = gql`
  query VisitsCount(
    $accountTag: string!
    $siteTag: string!
    $startDate: Time!
    $endDate: Time!
  ) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        total: rumPageloadEventsAdaptiveGroups(
          limit: 1
          filter: {
            siteTag: $siteTag
            datetime_geq: $startDate
            datetime_leq: $endDate
            requestHost: "meluiz.com"
          }
        ) {
          count
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
  limit: number;
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
  query VisitsCount(
    $accountTag: string!
    $siteTag: string!
    $startDate: Time!
    $endDate: Time!
    $limit: uint64!
  ) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        lastAccess: rumPageloadEventsAdaptiveGroups(
          limit: 1
          orderBy: [datetimeMinute_DESC]
          filter: {
            siteTag: $siteTag
            requestHost: "meluiz.com"
            datetime_geq: $startDate
            datetime_leq: $endDate
          }
        ) {
          count
          sum {
            visits
          }
          dimensions {
            datetimeMinute
            countryName
          }
        }
      }
    }
  }
`;
