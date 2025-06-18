import { routes } from 'src/constants/routes'
import { SearchType } from 'tukibook-helper'

type ActivePathnameKeys = {
  [key in SearchType]: boolean
}

export const isActiveRoute = (key: SearchType) => {
  const currentPathname = window.location.pathname

  const activePathname: ActivePathnameKeys = {
    [SearchType.ALL]: currentPathname === routes.search,
    [SearchType.POSTS]: currentPathname === routes.searchPosts,
    [SearchType.USERS]: currentPathname === routes.searchUsers,
  }

  return !!activePathname[key]
}
