import { viewTypes, baseModelProperty, detailModelProperty } from "xaf-app-module/dist/views";
import { authStoreId } from "xaf-app-module/dist/stores";
import { actionsId } from "./actionsId";

export const
    loginView = {
        id: "AuthenticationStandardLogonParameters_DetailView_Demo$Edit",
        type: viewTypes.detailView,
        title: "Logon",
        pane: "simplePopup",
        params: [
            {
                name: baseModelProperty.viewState,
                type: authStoreId
            }
        ],
        components: [
            {
                type: "stackPanel",
                horizontalAlign: "center",
                style: {
                    width: "100%"
                },
                components: [
                    {
                        type: "label",
                        text: "XAF Demo",
                        style: {
                            width: "auto",
                            fontSize: "30px"
                        }
                    },
                    {
                        type: "label",
                        text: "Sign In to your account",
                        style: {
                            width: "auto"
                        }
                    },
                    {
                        type: "form",
                        colCount: 1,
                        labelLocation: "top",
                        items: [
                            {
                                type: "input",
                                title: "User Name",
                                value: `$local.${detailModelProperty.currentObjPropName}.UserName`
                            },
                            {
                                type: "passbox",
                                title: "Password",
                                value: `$local.${detailModelProperty.currentObjPropName}.Password`
                            },
                            {
                                type: "button",
                                text: "Logon",
                                kind: "default",
                                onClick: {
                                    $action: { actionId: actionsId.logonAction }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };