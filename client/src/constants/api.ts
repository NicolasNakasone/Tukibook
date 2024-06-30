// Cobrara mas sentido cuando haya usuarios, tokens, etc
export const handleFetch = async (
  url: RequestInfo,
  options?: RequestInit | undefined
): Promise<Response | null> => {
  const response = await fetch(url, options)

  return response
}
