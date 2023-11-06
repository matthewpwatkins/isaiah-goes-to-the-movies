import { reportPageHit } from "./Analytics";

export interface InitPageProps {
  pageTitle?: string;
};

export function initPage(props: InitPageProps) {
  document.title = 'Isaiah Goes to the Movies' + (props.pageTitle ? ` - ${props.pageTitle}` : '');
  reportPageHit();
}