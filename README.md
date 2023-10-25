# confirm-deploy-version-action

This action will confirm if a deployed version of a service/webapp matches a given commit

## Usage

```yml
- uses: ThreadsStyling/confirm-deploy-version-action
  with:
    expected_version_commit_hash: "25e6c46a48a3052c27b8f35e2e3cd513193ce9a8"
    service_status_url: "https://service.threadsstyling.com/status"
```

## Inputs

```yml
inputs:
  expected_version_commit_hash:
    required: true
    description: "The commit sha to use as the HEAD, defaults to the current sha"
  service_status_url:
    required: true
    description: "The URL to fetch the service/webapp buildinfo object"
  service_version_commit_field:
    required: false
    description: 'The field where commit hash is expected to be stored on in the buildinfo object. Defaults to "BUILD_COMMIT".'
```

## Publishing

Actions are run from GitHub repos so we will check in the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git tag -fa v1.0.0 -m "v1.0.0"
$ git push --tags
$ git checkout v1
$ git push origin v1 --force
$ git checkout master
```

## Local Testing

Install [act](https://github.com/nektos/act) via brew.

Then make a copy of the `.env.schema` in `.env`, and fill it out with the expected environment variables.

You can then run `act -j local`.

Make sure to run `yarn run build && yarn run package` first to use the latest version of the action.
