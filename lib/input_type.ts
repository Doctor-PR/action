export interface WorkflowInputs {
  base_branch_name: string;
  aider_args: string;
  base_pull_request_number: string;
  review_id: string;
  author_username: string;
}

export function encodeWorkflowInputs(inputs: WorkflowInputs): string {
  return JSON.stringify(inputs);
}

export function decodeWorkflowInputs(encoded: string): WorkflowInputs {
  return JSON.parse(encoded);
}
