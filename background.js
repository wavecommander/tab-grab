let FIVE_MINUTES = 5 * 60 * 1000;

function filterTabs(tabs){
    let shortlist = []

    for (const tab1 of tabs) {
        let oldestTime = tab1.time
        let curTab = tab1

        for (const tab2 of tabs) {
            if(tab1.url == tab2.url && tab2.time < oldestTime) curTab = tab2;
        }
        shortlist.push(curTab)
    }
    return shortlist;
}

function getTabs() {
    console.log("Getting tabs ...")
    chrome.tabs.query({}, function (newTabs) {
        let datetime = new Date()
        let formattedTabs = newTabs.map( (tab) => { return {url:tab.url, title:tab.title, time:datetime.getTime(), date:datetime.toUTCString()}; });

        chrome.storage.sync.get("storedTabs" , (storedTabs) => {
            let unfilteredTabs = formattedTabs;
            if(Array.isArray(storedTabs)) {
                unfilteredTabs = formattedTabs.concat(storedTabs);
            }

            let filteredTabs = filterTabs(unfilteredTabs);

            chrome.storage.sync.set({"storedTabs": filteredTabs}, () => {
                console.log("Saved tabs ...");
            });
        });
    });
}

setInterval(getTabs, FIVE_MINUTES);
