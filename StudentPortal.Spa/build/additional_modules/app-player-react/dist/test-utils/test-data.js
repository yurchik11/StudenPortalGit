/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
export var testConfig = {
    id: "com.company.application",
    title: "Help Desk Demo",
    views: [
        {
            id: "incidents",
            pane: "main",
            title: "Incidents"
        },
        {
            id: "incident",
            pane: "preview",
            title: "Incident",
            params: [
                {
                    name: "id",
                    type: "string"
                }
            ],
            components: []
        },
        {
            id: "incidentEdit",
            title: "Incident Edit",
            pane: "main",
            params: [
                {
                    name: "id",
                    type: "string"
                }
            ],
            components: []
        },
        {
            id: "addIncident",
            pane: "preview",
            title: "New Incident"
        },
        {
            id: "about",
            pane: "main",
            title: "About"
        },
        {
            id: "popup",
            pane: "popup",
            title: "Popup"
        }
    ],
    navigation: {
        defaultItemId: "incidents",
        title: "Navigation",
        items: [
            {
                id: "incidents",
                visible: true,
                title: "Incidents"
            },
            {
                id: "about",
                visible: true,
                title: "About"
            }
        ]
    }
};
it("true", function () {
    expect(true).toBe(true);
});
