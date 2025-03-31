/**
 * @typedef {Object} WorkflowInputs
 * @property {string} base_branch_name
 * @property {string} aider_args
 * @property {string} base_pull_request_number
 * @property {string} review_id
 * @property {string} author_username
 */

/**
 * @param {WorkflowInputs} inputs
 * @returns {string}
 */
function encodeWorkflowInputs(inputs) {
  return JSON.stringify(inputs);
}

/**
 * @param {string} encoded
 * @returns {WorkflowInputs}
 */
function decodeWorkflowInputs(encoded) {
  return JSON.parse(encoded);
}

module.exports = {
  encodeWorkflowInputs,
  decodeWorkflowInputs,
};
