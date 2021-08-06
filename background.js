// let color = '#fff000';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

var ONE_MINUTE = 5 * 1000;

function getTabs() {
    var clean_tabs = []
    chrome.tabs.query({}, function (tabs) {
        clean_tabs = tabs.map( function(tab) { return {url:tab.url, title:tab.title}; });
    })
    console.log(clean_tabs);
}

setInterval(getTabs, ONE_MINUTE);
