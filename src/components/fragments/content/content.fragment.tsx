import React from'react';
import './content.page.scss';




export function ContentFragment(props: any) {



  return (
    <main id="Main" className="flex-grow">
      { props && props.children && props.children }
    </main>
  );
}