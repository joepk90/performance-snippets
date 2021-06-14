new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      let consoleGroup = `%cLCP candidate: ${Math.round(entry.startTime)}ms`;
      let styles = '';
      if (entry.startTime >= 2500) {
        styles = 'color: red;';
      }
      console.group(consoleGroup, styles);
      console.log('Element:', entry.element);
      console.groupEnd(consoleGroup);
    }
  }).observe({type: 'largest-contentful-paint', buffered: true});