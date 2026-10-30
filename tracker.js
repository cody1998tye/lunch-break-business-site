(function () {
  var WORKER_URL = 'https://lbb-analytics.cody1998tye.workers.dev';

  var sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
  var startTime = Date.now();
  var maxScroll = 0;
  var exitSent = false;

  function getScrollPct() {
    var el = document.documentElement;
    var scrollable = el.scrollHeight - el.clientHeight;
    if (scrollable <= 0) return 100;
    return Math.min(100, Math.round((window.scrollY / scrollable) * 100));
  }

  window.addEventListener('scroll', function () {
    var s = getScrollPct();
    if (s > maxScroll) maxScroll = s;
  }, { passive: true });

  // Send initial pageview
  fetch(WORKER_URL + '/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'pageview',
      sessionId: sessionId,
      page: location.pathname,
      referrer: document.referrer || '',
      timestamp: Date.now()
    })
  }).catch(function () {});

  function sendExit() {
    if (exitSent) return;
    exitSent = true;
    var payload = JSON.stringify({
      type: 'exit',
      sessionId: sessionId,
      page: location.pathname,
      timeOnPage: Math.round((Date.now() - startTime) / 1000),
      scrollDepth: maxScroll,
      timestamp: Date.now()
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(WORKER_URL + '/track', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch(WORKER_URL + '/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(function () {});
    }
  }

  window.addEventListener('beforeunload', sendExit);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') sendExit();
  });
})();
