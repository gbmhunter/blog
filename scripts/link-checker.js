import blc from 'broken-link-checker';

console.log('Checking links...');

let brokenLinks = [];
let lastCheckedLink = null;
let numCheckedPages = 0;
const siteUrl = 'http://localhost:3000';

const options = {
  excludeExternalLinks: true,
  maxSocketsPerHost: 10,
};

var siteChecker = new blc.SiteChecker(options, {
  robots: function(robots, customData){},
  html: function(tree, robots, response, pageUrl, customData){},
  junk: function(result, customData){},

  // Called on the completion of each link check
  link: function(result, customData) {
    // console.log('result: ', result);

    if (result.excluded) {
      return;
    }

    lastCheckedLink = result.url.resolved;
    if (result.broken) {
      printLog(`BROKEN: On ${result.base.resolved}, url: ${result.url.resolved}, reason: ${blc[result.brokenReason]}`);
      brokenLinks.push(result);
    }
  },
  page: function(error, pageUrl, customData){
    numCheckedPages += 1;
  },
  site: function(error, siteUrl, customData){},
  end: function(){
    // Stop the periodic printing of progress
    clearInterval(interval);
    console.log(`\nLink checking complete. Found ${brokenLinks.length} broken links.`);
  }
});

// Print last checked link every second. Don't print all of them
// because this may slow the process down.
let interval = setInterval(function() {
  if (lastCheckedLink) {
    printProgress(`In progress... num. of pages checked: ${numCheckedPages}`);
  }
}, 1000);

siteChecker.enqueue(siteUrl);

function printProgress(progress){
  process.stdout.clearLine(0);
  // process.stdout.write('\x1B[2K');
  // process.stdout.write('\x1B[1A');
  // process.stdout.write('\x1B[2K');
  process.stdout.cursorTo(0);
  process.stdout.write(progress);
}

function printLog(log) {
  process.stdout.clearLine(0);
  // process.stdout.write('\x1B[2K');
  // process.stdout.write('\x1B[1A');
  // process.stdout.write('\x1B[2K');
  process.stdout.cursorTo(0);
  process.stdout.write(log + '\n');
}

