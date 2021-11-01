function getTabs() {
    console.log("Getting tabs ...")
    chrome.tabs.query({}, function (newTabs) {
        let datetime = new Date()
        let formattedTabs = newTabs.map( (tab) => { return {url:tab.url, title:tab.title, time:datetime.getTime(), date:datetime.toUTCString()}; });

        chrome.storage.local.get("storedTabs", (result) => {
            let storedTabs = result.storedTabs

            let unfilteredTabs = formattedTabs;
            if(Array.isArray(storedTabs)) {
                unfilteredTabs = formattedTabs.concat(storedTabs);
            }
            console.log(unfilteredTabs)

            let filteredTabs = filterTabs(unfilteredTabs);
            console.log(filteredTabs)

            chrome.storage.local.set({"storedTabs": filteredTabs}, () => {
                console.log("Saved tabs");
            });
        });
    });
}

function filterTabs(tabs) {
    let shortlist = new Set()

    for (const tab1 of tabs) {
        let oldestTime = tab1.time
        let curTab = tab1

        for (const tab2 of tabs) {
            if(tab1.url == tab2.url && tab2.time < oldestTime) curTab = tab2;
        }
        shortlist.add(curTab)
    }
    return Array.from(shortlist);
}

chrome.alarms.create("get-tabs", {delayInMinutes: 0, periodInMinutes: 5})
chrome.alarms.onAlarm.addListener(getTabs);
