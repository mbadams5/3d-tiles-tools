'use strict';
var Promise = require('bluebird');

module.exports = validateTileset;

/**
 * Walks down the tree represented by the JSON object and checks if it is a valid tileset.
 *
 * @param {Object} tileset The JSON object representing the tileset.
 * @return {Promise} A promise that resolves with two parameters - (1) a boolean for whether the tileset is valid
 *                                                                 (2) the error message if the tileset is not valid.
 *
 */
function validateTileset(tileset) {
    if (tileset.root.geometricError > tileset.geometricError) {
        return Promise.resolve(false, 'Root has geometricError greater than tileset');
    }

    return new Promise(function(resolve) {
        validateNode(tileset.root, tileset.geometricError, resolve);
    });

}

function validateNode(node, parentGeometricError, resolve) {
    if (node.geometricError > parentGeometricError) {
        return resolve(false, 'Child has geometricError greater than parent');
    }
    // Call the function with each child
    var length = node.children.length;
    for (var i = 0; i < length; i++) {
            validateNode(node.children[i], node.geometricError, resolve);
    }

}