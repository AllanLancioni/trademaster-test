export type QueryParams = { [key: string]: string | RegExp }

export default function handleQueryParams(params: any, fieldsToRegExp: string[] = []): QueryParams {

  const newParams: QueryParams = {...params}
  for (const field of fieldsToRegExp) {
    if (newParams[field])
      newParams[field] = new RegExp(`.*${params[field]}.*`, 'i')
  }

  console.log({newParams, params})

  return newParams

} 