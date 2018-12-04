import { loginView } from "./logon-view";
import { desktopContactDetailView, contactListView, phoneContactListView, phoneContactDetailView } from "./contact-views";
import { taskListView, taskDetailViewPreview, taskDetailViewEdit, phoneTaskListView } from "./task-views";
import * as traverse from "traverse";

function patchPhoneToolBarType(config) {
    return traverse.forEach(config, function(v) {
        if(this.key === "type" && v === "toolbar") {
            return "appbar";
        }
        return;
    });
}

const
    navigation = {
        defaultView: "DemoTask_ListView$View",
        items: [
            {
                // tslint:disable-next-line:max-line-length
                "icon": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjMsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iIzRENkRBRCIgZD0iTTIzLDIwYzAsMS43LTEuMywzLTMsM0g0Yy0xLjYsMC0zLTEuMy0zLTNWNGMwLTEuNiwxLjQtMywzLTNoMTZjMS43LDAsMywxLjQsMywzVjIweiIvPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTE2LDE0LjNjLTAuMy0wLjItMC43LTAuMS0wLjksMC4xbC0xLDEuM2MtMS0wLjctMi0xLjYtMi45LTIuNmMtMC45LTEtMS42LTIuMS0yLTMuM2wxLjQtMC43DQoJQzExLDguOSwxMS4xLDguNiwxMSw4LjNMOC45LDQuMUM4LjcsMy44LDguMywzLjcsOCwzLjhMNS43LDVDNS41LDUuMSw1LjQsNS40LDUuNCw1LjVDNC45LDguNyw2LjYsMTIuMiw5LDE1DQoJYzIuNCwyLjgsNS41LDUuMSw4LjcsNS4yYzAuMiwwLDAuNSwwLDAuNi0wLjJsMS42LTIuMWMwLjItMC4zLDAuMS0wLjctMC4xLTAuOUwxNiwxNC4zeiIvPg0KPC9zdmc+DQo=",
                title: "Contacts",
                visible: true,
                "id": "Contact_ListView$View",
                viewId: contactListView.id
            },
            {
                // tslint:disable-next-line:max-line-length
                "icon": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjMsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZD0iTTUuMiw2LjgiLz4NCjxwYXRoIGZpbGw9IiM0RDZEQUQiIGQ9Ik0yMywyMGMwLDEuNy0xLjMsMy0zLDNINGMtMS42LDAtMy0xLjMtMy0zVjRjMC0xLjYsMS40LTMsMy0zaDE2YzEuNywwLDMsMS40LDMsM1YyMHoiLz4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik01LjEsMTIuNUM1LDEyLjQsNSwxMi4zLDUsMTIuMmMwLTAuMSwwLjEtMC4zLDAuMi0wLjRMNS45LDExYzAuMi0wLjIsMC41LTAuMiwwLjgsMGwwLjEsMC4xbDMsMy4yDQoJYzAuMSwwLjEsMC4zLDAuMSwwLjQsMGw3LjItNy41aDAuMWMwLjItMC4yLDAuNS0wLjIsMC44LDBsMC44LDAuOGMwLjIsMC4yLDAuMiwwLjUsMCwwLjhsLTguNiw5Yy0wLjEsMC4xLTAuMiwwLjItMC40LDAuMg0KCWMtMC4yLDAtMC4zLTAuMS0wLjQtMC4ybC00LjItNC41TDUuMSwxMi41eiIvPg0KPC9zdmc+DQo=",
                "title": "Tasks",
                visible: true,
                id: "DemoTask_ListView$View",
                viewId: taskListView.id,
                // items: [{ id: "Analytics", title: "Analytics" }]
            }
        ]
    },
    mainDemoAppConfig = {
        id: "Main Demo",
        title: "Main Demo",
        theme: {
            "appearance": "generic",
            "primaryColor": "#3361b7",
        },
        authorization: {
            loginView: loginView.id,
            allowAnonymous: false,
            "locations": []
        },
        navigation
    },
    desktopAppConfig = {
        ...mainDemoAppConfig,
        views: [loginView, contactListView, desktopContactDetailView, taskListView, taskDetailViewPreview(), taskDetailViewEdit()]
    },
    phoneAppConfig = {
        ...mainDemoAppConfig,
        views: [loginView, phoneContactListView, phoneContactDetailView, phoneTaskListView, patchPhoneToolBarType(taskDetailViewPreview()), patchPhoneToolBarType(taskDetailViewEdit())]
    };

export const
    mainDemoConfigs = {
        mobile: phoneAppConfig,
        tablet: desktopAppConfig,
        desktop: desktopAppConfig
    };