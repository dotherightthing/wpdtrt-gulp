/**
 * File: helpers/task-header.js
 *
 * Helper functions to visually organise build logs.
 */

/**
 * Group: Helpers
 * _____________________________________
 */

/**
 * Function: taskHeader
 *
 * Displays a block comment for each task that runs.
 *
 * Parameters:
 *   (string) taskCategory - Task category
 *   (string) taskAction - Task action
 *   (string) taskDetail - Task detail
 */
const taskHeader = (
  taskCategory = '',
  taskAction = '',
  taskDetail = ''
) => {
  let str = '';
  str += '\n';
  str += `=> ${taskCategory}: ${taskAction} - ${taskDetail}\n`;
  str += '\n';

  return str;
}

module.exports = taskHeader;
