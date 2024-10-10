import { gql } from "@apollo/client";

export const GET_THREADS = gql`
  query GetThreads($page: Int, $limit: Int) {
    threads(page: $page, limit: $limit) {
      totalItems
      totalPages
      currentPage
      threads {
        id
        content
        author {
          id
          username
          email
        }
        replies {
          id
          content
          author {
            id
            username
            email
          }
          createdAt
          replies {
            # Level 2
            id
            content
            author {
              id
              username
              email
            }
            createdAt
            replies {
              # Level 3
              id
              content
              author {
                id
                username
                email
              }
              createdAt
              replies {
                # Level 4 (Final Level)
                id
                content
                author {
                  id
                  username
                  email
                }
                createdAt
              }
            }
          }
        }
        createdAt
      }
    }
  }
`;
