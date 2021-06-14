function getLastResource(time, regex) {
    let entries = performance.getEntriesByType('resource')
    let last = null;
    for (let i = 0; i < entries.length; i++) {
      let e = entries[i];
      if (regex && !e.name.match(regex)) continue;
      if (e.responseEnd < time) last = e;
    }
    return last;
  }
  
  let po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // console.log(entry);
      let val = entry.value;
      let last = getLastResource(entry.startTime, /(woff)|(ttf)/);
      if (!last) continue;
      let diff = entry.startTime - last.responseEnd;
      if (diff < 100)
        console.log(
            last.name + ' was loaded ' + diff +
            'ms before a layout shift with impact ' + val);
    }
  });
  
  po.observe({type: 'layout-shift', buffered: true});