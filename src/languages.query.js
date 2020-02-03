import gql from "graphql-tag";

export const GET_LANGS = gql`
  query GET_LANGS {
    languages {
      code
      name
      rtl
    }
  }
`;
