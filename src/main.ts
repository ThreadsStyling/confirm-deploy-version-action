import * as core from "@actions/core";
import fetch, { Headers, HeadersInit } from "node-fetch";

async function getServiceDeployCommit(): Promise<string> {
  try {
    const serviceUrl = core.getInput("service_status_url");
    const serviceAuth = core.getInput("service_status_auth");

    const statusCommitField =
      core.getInput("service_version_commit_field") || "BUILD_COMMIT";

    const serviceUrlParts = new URL(serviceUrl);
    serviceUrlParts.searchParams.append(
      "cb",
      `${Math.floor(Math.random() * 10000)}`,
    );

    const headers: HeadersInit = new Headers();
    headers.set("Authorization", serviceAuth);

    const status = await fetch(serviceUrlParts.toString(), { headers });
    const statusJson = await status.json();

    return statusJson[statusCommitField];
  } catch (e) {
    core.error(
      `Failed to get service deployed commit: ${(e as Error).message}`,
    );
    throw e;
  }
}

async function run(): Promise<void> {
  try {
    const deployVersionCommitHash = await getServiceDeployCommit();

    const expectedCommitHash = core.getInput("expected_version_commit_hash");

    if (deployVersionCommitHash !== expectedCommitHash) {
      core.setFailed(
        `Deploy version commit hash (${deployVersionCommitHash}) does not match the expected version commit hash (${expectedCommitHash}).`,
      );
    }

    core.info(
      `Deploy version commit hash matches expected commit hash (${expectedCommitHash})`,
    );
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
