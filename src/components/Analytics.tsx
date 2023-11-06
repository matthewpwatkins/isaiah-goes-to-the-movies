import ReactGA from "react-ga4";

let isProd: boolean | undefined = undefined;
let previousPath: string | undefined = undefined;

function checkEnvironment() {
  if (isProd === undefined) {
    isProd = window.location.hostname.endsWith(".com");
  }
}

export function initAnalytics() {
  checkEnvironment();
  ReactGA.initialize("G-PKLHX0TM5S", {
    testMode: !isProd,
  });
}

export function reportPageHit() {
  const path = window.location.pathname;
  if (path !== previousPath) {
    previousPath = path;
    ReactGA.send({
      hitType: "pageview",
      page: path,
      title: document.title,
    });
  }
}
