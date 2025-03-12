# Doctor PR

Doctor PR helps you address code reviews automatically with AI. 

It consists of a Github App and an accompanying GitHub Action. The GitHub app is responsible for listening for new reviews and triggering the GitHub Action. The GitHub Action is responsible making the changes to address the review by running a coding agent ([Aider](https://github.com/Aider-AI/aider)) and opening a new PR. 

## How it works

1. When a review is submitted for your PR, a `Address with Doctor PR` button is automatically added to it.
2. Clicking the button will trigger the GitHub Action, which will make a new PR with the changes and request a review from you.
3. If you're happy with the changes, simply merge it back into your branch, and re-request a review.

## Getting Started

1. Install the [GitHub App](https://github.com/apps/doctor-pr) to your repository.
2. On your GitHub repository, go to `Settings -> Actions -> General -> Workflow permissions` and check `Read and write permissions` and `Allow GitHub Actions to create and approve pull requests`. This is required to allow the GitHub Action to create PRs.
3. Create a new file in your repository called `.github/workflows/doctor-pr.yml` (must be named exactly this) and add the following code:

    ```yaml
    name: Doctor PR
    on:
    workflow_dispatch:
        inputs:
        base_branch_name:
            required: true
            type: string
        base_pull_request_number:
            required: true
            type: string
        review_id:
            required: true
            type: string
        author_username:
            required: true
            type: string
        aider_args:
            required: true
            type: string
        aider_api_key:
            required: true
            type: string
    jobs:
    doctor-pr:
        runs-on: ubuntu-latest
        steps:
        - name: Doctor PR
            uses: Doctor-PR/dr-pr-action@v0.0.9
            with:
            base_branch_name: ${{inputs.base_branch_name}}
            base_pull_request_number: ${{inputs.base_pull_request_number}}
            review_id: ${{inputs.review_id}}
            author_username: ${{inputs.author_username}}
            aider_args: ${{inputs.aider_args}}
            aider_api_key: ${{inputs.aider_api_key}}
    ```

## Frequently Asked Questions

### Is my code safe with Doctor PR?

Yes. Because the coding agent runs in GitHub Action rather than our server, your code never leaves GitHub's servers. Our GitHub Action is open source, and the coding agent we use ([Aider](https://github.com/Aider-AI/aider)) is also open source. As long as you trust GitHub and the LLM provider (Anthropic in our case), your code is safe.
