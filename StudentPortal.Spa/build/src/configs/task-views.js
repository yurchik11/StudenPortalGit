import { viewTypes } from "xaf-app-module/dist/views";
import { actionsId } from "./actionsId";

export const
    taskListViewId = "DemoTask_ListView$View",
    taskListView = {
        id: taskListViewId,
        type: viewTypes.listView,
        title: "Task",
        components: [
            {
                type: "xaf-toolbar",
                items: []
            },
            {
                type: "xaf-grid",
                id: "main-list",
                columns: ["Subject", "Description"]
            }
        ]
    },
    phoneTaskListView = {
        id: taskListViewId,
        type: viewTypes.listView,
        title: "Task",
        components: [
            {
                type: "xaf-appbar",
                items: []
            },
            {
                type: "xaf-list",
                id: "main-list",
                itemComponents: [
                    {
                        "type": "stackPanel",
                        "id": "verticalPanel",
                        "components": [
                            {
                                "type": "label",
                                "text": "$item.Subject"
                            },
                            {
                                "type": "label",
                                "text": "$item.Description"
                            }
                        ]
                    }
                ]
            }
        ]
    },

    taskDetailViewPreview = () => ({
        id: "DemoTask_DetailView$View",
        type: viewTypes.detailView,
        pane: "preview",
        title: "$local.currentObject.Subject",
        components: [
            {
                type: "xaf-toolbar",
                items: [
                    {
                        type: "command",
                        parameterType: "button",
                        text: "Edit",
                        onExecute: {
                            $action: { actionId: actionsId.editAction }
                        }
                    }]
            },
            {
                "type": "form",
                "colCount": 1,
                "id": "mainForm",
                "items": [
                    {
                        "title": "Subject",
                        "type": "label",
                        "text": "$local.currentObject.Subject"
                    },
                    {
                        "title": "Description",
                        "type": "label",
                        "text": "$local.currentObject.Description"
                    },
                    {
                        "itemType": "group",
                        "caption": "Detailed Informations",
                        "items": [
                            {
                                "title": "StartDate",
                                "type": "datebox",
                                "readOnly": true,
                                "value": "$local.currentObject.StartDate"
                            },
                            {
                                "title": "Priority",
                                "type": "input",
                                "value": "$local.currentObject.Priority"
                            }
                        ]
                    }
                ]
            }]
    }),
    taskDetailViewEdit = () => ({
        id: "DemoTask_DetailView$Edit",
        type: viewTypes.detailView,
        title: "$local.currentObject.Subject",
        components: [{
            type: "xaf-toolbar",
            items: []
        },
        {
            "type": "form",
            "colCount": 1,
            "id": "mainForm",
            "items": [
                {
                    "title": "Subject",
                    "type": "input",
                    "value": "$local.currentObject.Subject"
                },
                {
                    "title": "Description",
                    "type": "input",
                    "value": "$local.currentObject.Description"
                },
                {
                    "itemType": "group",
                    "caption": "Detailed Informations",
                    "items": [
                        {
                            "title": "StartDate",
                            "type": "datebox",
                            "value": "$local.currentObject.StartDate"
                        },
                        {
                            "title": "Priority",
                            "type": "input",
                            "value": "$local.currentObject.Priority"
                        }
                    ]
                }
            ]
        }]
    });
