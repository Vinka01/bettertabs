import { getCurrentWorkspaceId } from "./modules/tabs.mjs";

chrome.tabs.onActivated.addListener(async(tab) => {
    console.log(tab);
    let workspaceId = await getCurrentWorkspaceId();
    if (workspaceId) {
        chrome.storage.local.get("workspace_current_id", (result) => {
            if (result.workspace_current_id != workspaceId) {
                chrome.storage.local.set({ "workspace_current_id": workspaceId }, () => {
                    console.log("Workspace switched");
                });
            }
        });
    }
});