import { useQuery } from "@tanstack/react-query";

interface LoadingProps {
  queryKey: string;
  queryFn: () => Promise<any>;
}
export default function Loading({ queryKey, queryFn }: LoadingProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: [queryKey],
    queryFn
  });
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }
  if (error) {
    return <div> Erro ao carregar os dados </div>
  }
  return (
    <div>{JSON.stringify(data)}</div>
  );
}