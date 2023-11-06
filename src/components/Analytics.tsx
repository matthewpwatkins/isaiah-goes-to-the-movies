import ReactGA from "react-ga4";

let isProd : boolean | undefined = undefined;
let previousPath : string | undefined = undefined;

function checkEnvironment() {
  if (isProd === undefined) {
    isProd = window.location.hostname.endsWith('.com');
  }
}

export function initAnalytics() {
  checkEnvironment();
  if (isProd) {
    ReactGA.initialize("G-PKLHX0TM5S");
  }
}

export function reportPageHit() {
  checkEnvironment();
  if (isProd) {
    const path = window.location.pathname;
    if (path !== previousPath) {
      ReactGA.send({ hitType: "pageview", page: path, title: document.title });
      previousPath = path;
    }
  }
}