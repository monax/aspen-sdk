import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import { ClaimBalance, ClaimBalance_Filter, GetClaimBalancesQuery } from './claims.types';

export async function getClaimBalances(
  client: GraphQLClient,
  filter: ClaimBalance_Filter = {},
  skip = 0,
  first = 100,
): Promise<ClaimBalance[]> {
  const result = (await client.request(getClaimBalancesQuery, {
    claimBalanceFilter: filter,
    skip,
    first,
  })) as GetClaimBalancesQuery;
  return result.claimBalances;
}

const getClaimBalancesQuery = gql`
  query getClaimBalances($claimBalanceOrderBy: ClaimBalance_orderBy, $claimBalanceFilter: ClaimBalance_filter) {
    claimBalances(orderBy: $claimBalanceOrderBy, where: $claimBalanceFilter) {
      id
      contractAddress
      tokenType
      receiver
      tokenId
      totalClaimed
    }
  }
`;
