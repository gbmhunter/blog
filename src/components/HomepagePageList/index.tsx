import React from 'react';
import {useDocsSidebar, useDocById} from '@docusaurus/theme-common/internal';
import DocCardList from '@theme/DocCardList';

export default function HomepageFeatures(): JSX.Element {
  const sidebar = useDocsSidebar();
  console.log('sidebar:', sidebar);

  const doc = useDocById('electronics/low-power-design/index');
  console.log('doc:', doc);

  // Remove items that are hidden with sidebar_class_name: hidden in the frontmatter
  const itemsToShow = sidebar.items.filter((item) => {
    return item.className !== 'hidden';
  });

  return (
    <DocCardList items={itemsToShow} />
  );
}