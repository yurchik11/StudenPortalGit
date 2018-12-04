/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
var registeredDefinitions = {};
export function registerCommandDefinitions(definitions) {
    if (definitions === void 0) { definitions = []; }
    definitions.forEach(function (definition) { return registeredDefinitions[definition.id] = definition; });
}
export function getCommandDefinitions(definitionsOrIds) {
    if (definitionsOrIds === void 0) { definitionsOrIds = []; }
    return definitionsOrIds.map(getCommandDefinition);
}
function getCommandDefinition(definitionOrId) {
    var command = typeof definitionOrId === "string" ? registeredDefinitions[definitionOrId] : definitionOrId;
    if (!command) {
        console.warn("Command definition " + definitionOrId + " is not registered");
    }
    return command;
}
