export const parseFilters = <T>(filters: string): T => {
  try {
    return JSON.parse(filters)
  } catch (error) {
    throw new Error(`${error}`)
  }
}
