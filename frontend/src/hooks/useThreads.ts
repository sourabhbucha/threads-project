// src/hooks/useThreads.ts
import { useQuery } from "@apollo/client";
import { GET_THREADS } from "../graphql/queries";

const useThreads = (page: number = 1, limit: number = 50) => {
  const { data, loading, error, refetch } = useQuery(GET_THREADS, {
    variables: { page, limit },
  });

  return {
    threads: data?.threads?.threads || [],
    loading,
    error,
    totalItems: data?.threads?.totalItems || 0,
    totalPages: data?.threads?.totalPages || 0,
    currentPage: data?.threads?.currentPage || 0,
    refetch,
  };
};

export default useThreads;
