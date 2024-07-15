/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import BlogPostItemHeaderAuthor from '@theme/BlogPostItem/Header/Author';
import type {Props} from '@theme/BlogPostItem/Header/Authors';
import styles from './styles.module.css';
import { Author } from '@docusaurus/plugin-content-blog';

// Component displays authors for the docs plugin in the same way as the blog plugin.
// Copied from node_modules/@docusaurus/theme-classic/src/theme/BlogPostItem/Header/Authors/index.tsx
export default function DocItemHeaderAuthors({
  className,
}: Props): JSX.Element | null {
  // const {
  //   metadata: {authors},
  //   assets,
  // } = useBlogPost();

  // Hardcoded authors for now, todo would be to get this from the frontmatter
  const authors: Author[] = [
    {
      name: 'Geoffrey Hunter',
      title: 'mbedded.ninja Author',
      url: "https://blog.mbedded.ninja",
      imageURL: 'https://github.com/gbmhunter.png',
    }
  ]

  const authorsCount = authors.length;
  if (authorsCount === 0) {
    return null;
  }
  const imageOnly = authors.every(({name}) => !name);
  return (
    <div
      className={clsx(
        'margin-top--md margin-bottom--sm',
        imageOnly ? styles.imageOnlyAuthorRow : 'row',
        className,
      )}>
      {authors.map((author, idx) => (
        <div
          className={clsx(
            !imageOnly && 'col col--6',
            imageOnly ? styles.imageOnlyAuthorCol : styles.authorCol,
          )}
          key={idx}>
          <BlogPostItemHeaderAuthor
            author={author}
          />
        </div>
      ))}
    </div>
  );
}
