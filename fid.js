new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const delay = entry.processingStart - entry.startTime;
      let consoleGroup = `%cFID value: ${Math.round(delay)}ms`;
      let styles = '';
      if (delay >= 100) {
        styles = 'color: red;';
      }
      console.group(consoleGroup, styles);
      console.log(`Event name: ${entry.name}`);
      console.log('Element:', entry.target);
      console.groupEnd(consoleGroup);
    }
  }).observe({type: 'first-input', buffered: true});