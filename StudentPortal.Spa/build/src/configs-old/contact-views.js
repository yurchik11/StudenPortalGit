import { viewTypes, detailModelProperty } from "xaf-app-module/dist/views";
import { actionsId } from "./actionsId";

export const
    contactListViewId = "Contact_ListView$View";

const
    commands = {
        selectionIndependent: [
            {
                type: "command",
                parameterType: "button",
                text: "New",
                onExecute: {
                    $action: { actionId: actionsId.newAction }
                }
            },
            {
                type: "command",
                parameterType: "button",
                text: "Refresh",
                onExecute: {
                    $action: { actionId: actionsId.refreshAction }
                }
            },
            {
                type: "command",
                parameterType: "string",
                mode: "search",
                text: "Full Text Search",
                showClearButton: true,
                onExecute: {
                    $action: { actionId: actionsId.fullTextSearch }
                }
            }
        ],
        selectionDependent: [
            {
                "id": "delete",
                text: "Delete",
                "type": "command",
                parameterType: "button",
                "onExecute": {
                    "$code": "$local.selectedItems = []"
                }
            }
        ]
    },
    desktopTasks = [
        {
            id: "tasksToolbar",
            type: "xaf-toolbar",
            selectionIndependent: [
                {
                    parameterType: "button",
                    text: "New",
                    location: "before",
                    onExecute: {
                        $action: { actionId: actionsId.newAction, propertyName: "Tasks" }
                    }
                }
            ]
        },
        {
            type: "xaf-grid",
            dataSource: { propertyName: "Tasks" },
            columns: ["Subject", "Priority"]
        }
    ],
    phoneTasks = [
        {
            type: "xaf-list",
            dataSource: { propertyName: "Tasks" },
            itemComponents: [
                {
                    "type": "stackPanel",
                    "id": "gorizontalPanel",
                    "components": [
                        {
                            "type": "label",
                            "id": "department",
                            "text": "$item.Subject"
                        },
                        {
                            "type": "label",
                            "id": "department",
                            "text": "$item.Priority"
                        }
                    ]
                }
            ]
        },
        {
            id: "tasksToolbar",
            type: "toolbar",
            items: [
                {
                    parameterType: "button",
                    text: "New",
                    location: "before",
                    onExecute: {
                        $action: { actionId: actionsId.newAction, propertyName: "Tasks" }
                    }
                }
            ]
        }
    ],
    contactDetailView = (taskItems) => ({
        id: "Contact_DetailView$Edit",
        type: viewTypes.detailView,
        title: `$local.${detailModelProperty.currentObjPropName}.FullName`,
        imediatePostDataProperties: ["Department"],
        components: [
            {
                id: "viewToolbar",
                type: "toolbar",
                items: [
                    {
                        parameterType: "button",
                        text: "Refresh",
                        location: "before",
                        onExecute: {
                            $action: { actionId: actionsId.refreshAction }
                        }
                    },
                    {
                        parameterType: "button",
                        text: "Save",
                        location: "before",
                        onExecute: {
                            $action: { actionId: actionsId.saveAction }
                        }
                    },
                    {
                        parameterType: "button",
                        text: "Save&Close",
                        location: "before",
                        onExecute: {
                            $action: { actionId: actionsId.saveAndCloseAction }
                        }
                    }
                ]
            },
            {
                type: "form",
                items: [
                    {
                        itemType: "tabbed",
                        tabs: [
                            {
                                title: "Main",
                                style: { width: "100%" },
                                items: [
                                    {
                                        type: "input",
                                        title: "FirstName",
                                        value: `$local.${detailModelProperty.currentObjPropName}.FirstName`
                                    },
                                    {
                                        type: "input",
                                        title: "Last Name",
                                        value: `$local.${detailModelProperty.currentObjPropName}.LastName`
                                    },
                                    {
                                        type: "xaf-lookup",
                                        title: "Department",
                                        searchExpr: "Title",
                                        displayExpr: "Title",
                                        propertyName: "Department",
                                    },
                                    {
                                        type: "xaf-lookup",
                                        title: "Position",
                                        searchExpr: "Title",
                                        displayExpr: "Title",
                                        propertyName: "Position"
                                    },
                                    {
                                        type: "xaf-fileImage",
                                        ownedObject: "$local.currentObject",
                                        propertyName: "Photo",
                                        value: "$local.imagesHolder.Photo",
                                        style: { height: "auto" }
                                    }]
                            },
                            {
                                title: "Tasks",
                                items: taskItems
                            },
                            {
                                title: "Phone Numbers",
                                items: [
                                    {
                                        type: "xaf-grid",
                                        dataSource: { propertyName: "PhoneNumbers" },
                                        columns: ["Number", "PhoneType"]
                                    }
                                ]
                            },
                            {
                                title: "Change History",
                                items: []
                            }
                        ]
                    }
                ]
            }
        ]
    });
export const
    phoneContactListView = {
        id: contactListViewId,
        type: viewTypes.listView,
        title: "Contact",
        components: [
            {
                type: "xaf-appbar",
                ...commands
            },
            {
                type: "xaf-list",
                id: "main-list",
                grouped: true,
                dataSource: {
                    group: [{ selector: "Department.Title" }]
                },
                groupComponents: [
                    {
                        "type": "label",
                        "id": "department",
                        // Bug https://github.com/DevExpress/devextreme-react/issues/148
                        "text": "$item.items[0].Department.Title"
                    }
                ],
                itemComponents: [
                    {
                        "type": "stackPanel",
                        "id": "gorizontalPanel",
                        orientation: "horizontal",
                        "components": [
                            {
                                type: "xaf-image",
                                ownedObject: "$item",
                                propertyName: "Photo",
                                style: {
                                    height: "48px",
                                    "borderRadius": "48px",
                                    width: "auto",

                                }
                            },
                            {
                                "type": "stackPanel",
                                "id": "gorizontalPanel",
                                "components": [
                                    {
                                        "type": "label",
                                        "id": "department",
                                        "text": "$item.FullName"
                                    },
                                    {
                                        "type": "label",
                                        "id": "department",
                                        "text": "$item.Position.Title"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }]
    },
    contactListView = {
        id: contactListViewId,
        type: viewTypes.listView,
        title: "Contact",
        components: [
            {
                type: "xaf-toolbar",
                ...commands
            },
            {
                type: "xaf-grid",
                id: "main-list",
                columns: [
                    {
                        dataField: "Department.Title",
                        groupIndex: 0
                    },
                    {
                        caption: "Photo",
                        width: "128px",
                        components: [{
                            type: "xaf-image",
                            style: { height: "auto" },
                            ownedObject: "$item",
                            propertyName: "Photo"
                        }]
                    },
                    "FullName",
                    "Position.Title",
                    "Email"
                ]
            }
        ]
    },
    desktopContactDetailView = contactDetailView(desktopTasks);
export let phoneContactDetailView = contactDetailView(phoneTasks);
phoneContactDetailView.components[0].type = "appbar";