'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let currentState = { ...state }; // начальная копия

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const stateCopy = { ...currentState, ...action.extraData };

        currentState = stateCopy;
        break;
      }

      case 'removeProperties': {
        const stateCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        currentState = stateCopy;
        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    statesHistory.push(currentState);
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
