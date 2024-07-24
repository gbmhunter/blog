import React from 'react';
import {useDocsSidebar} from '@docusaurus/theme-common/internal';
// import {getSidebarBreadcrumbs} from '@docusaurus/theme-common';
import DocCardList from '@theme/DocCardList';

export default function HomepageFeatures(): JSX.Element {

  // const {pathname} = useLocation();
  const pathname = '/electronics/';
  const sidebar = useDocsSidebar();
  console.log('sidebar', sidebar);

  const itemsToShow = sidebar.items.filter((item) => {
    return item.className !== 'hidden';
  });
  // if (!sidebar) {
  //   throw new Error('Unexpected: cant find current sidebar in context');
  // }
  // const categoryBreadcrumbs = getSidebarBreadcrumbs({
  //   sidebarItems: sidebar.items,
  //   pathname,
  //   onlyCategories: true,
  // });
  // const deepestCategory = categoryBreadcrumbs.slice(-1)[0];
  // if (!deepestCategory) {
  //   throw new Error(
  //     `${pathname} is not associated with a category. useCurrentSidebarCategory() should only be used on category index pages.`,
  //   );
  // }
  // return deepestCategory;



    return (
      <DocCardList items={itemsToShow} />
    );
}