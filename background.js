var ONE_MINUTE = 5 * 1000;

function filterTabs(tabs){
    let shortlist = []
    let count = 0

    console.log(tabs)

    for (const tab1 of tabs) {
        for (const tab2 of tabs) {
            if(tab1.url == tab2.url && tab1.time < tab2.time) {
                shortlist.push(tab1);
            } else {
                shortlist.push(tab2);
            }
            count += 1
        }
    }

    console.log(count)
    return shortlist;
}

function getTabs() {
    chrome.tabs.query({}, function (newTabs) {
        let formattedTabs = newTabs.map( (tab) => { return {url:tab.url, title:tab.title, time:(new Date()).getTime()}; });

        chrome.storage.sync.get( "storedTabs" , (storedTabs) => {
            console.log(storedTabs);

            let unfilteredTabs = formattedTabs;
            if(Array.isArray(storedTabs)) {
                unfilteredTabs = formattedTabs.concat(storedTabs);
            }

            let filteredTabs = filterTabs(unfilteredTabs);
            console.log(filteredTabs);

            chrome.storage.sync.set({ "storedTabs": filteredTabs}, () => {
                chrome.storage.sync.get( "storedTabs" , (storedTabs) => {
                    console.log(storedTabs);
                });
            });
        });
    });
}

setInterval(getTabs, ONE_MINUTE);
