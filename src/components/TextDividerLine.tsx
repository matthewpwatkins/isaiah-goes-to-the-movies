import { PropsWithChildren } from 'react';
import './TextDividerLine.css';

export function TextDividerLine(props: PropsWithChildren) {
  return (<div className="text-divider-line">
    <span>{props.children}</span>
  </div>);
}