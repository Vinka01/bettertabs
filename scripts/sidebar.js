import { queryTabs, getAlltabs } from "./modules/tabs.mjs";
import "./api/jquery-3.6.4-min.js";

let workspaceId;

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace != "local") return;

    if (changes.workspace_current_id) {

        workspaceId = changes.workspace_current_id.newValue;
        updateUI();
    }
});

window.onfocus = function() {
    console.log("user focussed");
    //updateUI();
};

async function updateUI() {
    console.log("update ui...");

    let tabview = $('#tabview');
    tabview.empty();


    let tabs = await getAlltabs();
    let workspaceTabs = tabs.filter(tab => tab.workspaceId == workspaceId);
    console.log(workspaceTabs);

    let compiled = [];

    $.each(workspaceTabs, function(i, item) {
        compiled.push("<li>" + item.title + "</li>");
    });

    tabview.html(compiled.join(' '));
}