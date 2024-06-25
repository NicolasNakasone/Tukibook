export const validateRequiredFields = (...fields: any[]): boolean => {
  return fields.every(field => !!field)
}
