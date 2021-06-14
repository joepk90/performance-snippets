(function() {
    try {
      let cls = 0;
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'absolute';
      canvas.style.left = 0;
      canvas.style.top = 0;
      canvas.style.zIndex = 100000;
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);
      const context = canvas.getContext('2d');
      const po = new PerformanceObserver((list) => {
        canvas.style.transition = 'opacity 0s';
        canvas.style.opacity = 1;
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput && entry.value >= 0.0025) {
            cls += entry.value;
            let consoleGroup = `%cTotal CLS value: ${cls}`;
            let styles = '';
            if (cls >= 0.1) {
              styles = 'color: red;';
            }
            console.group(consoleGroup, styles);
            console.log(`Current LS value: ${entry.value}`);
            let consoleSubGroup = 'List of source elements:';
            console.group(consoleSubGroup);
            for (const source of entry.sources) {
              context.strokeStyle = 'yellow';
              context.strokeRect(
                  source.previousRect.x, source.previousRect.y,
                  source.previousRect.width, source.previousRect.height);
              context.strokeStyle = 'red';
              context.strokeRect(
                  source.currentRect.x, source.currentRect.y,
                  source.currentRect.width, source.currentRect.height);
              console.log(source);
            }
            console.groupEnd(consoleSubGroup);
            setTimeout(function() {
              canvas.style.transition = 'opacity 100s';
              canvas.style.opacity = 0;
            }, 100);
            console.log(`Timing: ${Math.round(entry.startTime)}ms`);
            console.groupEnd(consoleGroup);
          }
        }
      });
      po.observe({type: 'layout-shift', buffered: true});
    } catch (e) {
    }
  })();