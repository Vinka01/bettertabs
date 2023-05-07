export async function queryTabs(query) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query(query, (tabs) => {
            if (chrome.runtime.lastError) {
                return reject();
            }
            resolve(tabs);
        });
    });
}


export async function getAlltabs() {
    return queryTabs({});
}

export async function getCurrentWorkspaceId() {
    let tab = await queryTabs({ active: true, lastFocusedWindow: true });
    if (tab[0]) {
        return tab[0].workspaceId;
    }
    return null;
}

export async function getCurrentWindowId() {
    let tab = await queryTabs({ active: true, lastFocusedWindow: true });
    if (tab[0]) {
        return tab[0].winowId;
    }
    return null;
}