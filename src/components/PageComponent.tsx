import { reportPageHit } from "../util/Analytics";

export interface InitPageProps {
  pageTitle?: string;
}

export function initPage(props: InitPageProps) {
  document.title =
    (props.pageTitle ? `${props.pageTitle} - ` : "") +
    "Isaiah Goes to the Movies";
  reportPageHit();
}
