import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/Admonition/Type/Tip';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconTip from '@theme/Admonition/Icon/Tip';

const infimaClassName = 'alert alert--example';

const defaultProps = {
  icon: <IconTip />,
  title: (
    <Translate
      id="theme.admonition.example"
      description="The default label used for the Tip admonition (:::tip)">
      tip
    </Translate>
  ),
};

function AdmonitionTypeExample(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      title="Example"
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}

// function MyCustomAdmonition(props) {
//   return (
//     <div style={{border: 'solid red', padding: 10}}>
//       <h5 style={{color: 'blue', fontSize: 30}}>{props.title}</h5>
//       <div>{props.children}</div>
//     </div>
//   );
// }

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,

  // Add all your custom admonition types here...
  // You can also override the default ones if you want
  'example': AdmonitionTypeExample,
};

export default AdmonitionTypes;