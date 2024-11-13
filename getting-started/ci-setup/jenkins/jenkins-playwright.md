---
description: Running Playwright tests in parallel with Jenkins and Currents Dashboard
---

# Playwright - Jenkins

Here's an example of Jenkins pipeline that is running Playwright tests in parallel on 2 workers.&#x20;

The pipeline will be running 2 workers, based on `mcr.microsoft.com/playwright:v1.34.0-jammy` Docker image. Those workers will run all the tests in parallel.

The steps are:

* Use `mcr.microsoft.com/playwright:v1.34.0-jammy` as the base image
* Install the necessary dependencies: `playwright` and `@currents/playwright`
* Populate the environment variable `CURRENTS_RECORD_KEY` using [Jenkins Credentials Store](https://jenkins.io/doc/book/using/using-credentials/). Learn more about [record-key.md](../../../guides/record-key.md "mention")
* Populate the environment variable `CURRENTS_PROJECT_ID` using [Jenkins Credentials Store](https://jenkins.io/doc/book/using/using-credentials/).
* Run Playwright tests on 2 workers, using CI Build ID for "connecting" the workers to the same parallel run. See [ci-build-id.md](../../../guides/ci-build-id.md "mention").

{% code overflow="wrap" %}
```
npx pwc --key CURRENTS_RECORD_KEY --project-id CURRENTS_PROJECT_ID --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID}"
```
{% endcode %}

Here's the full Jenkins pipeline configuration file:

{% code overflow="wrap" %}
```groovy
pipeline {
  agent {
    // this image provides everything needed to run Playwright
    docker {
      image 'mcr.microsoft.com/playwright:v1.34.0-jammy'
    }
  }

  stages {
    // installs node dependencies
    stage('build') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh 'npm install playwright @currents/plawyright'
      }
    }

    // this stage runs Playwright tests, and each agent uses the workspace
    // from the previous stage
    stage('Playwright parallel tests') {
      environment {
        // see https://jenkins.io/doc/book/using/using-credentials/
        CURRENTS_RECORD_KEY = credentials('currents-record-key')
        CURRENTS_PROJECT_ID = credentials('currents-project-id')
      }

      // Run parallel workers, see:
      // https://jenkins.io/doc/book/pipeline/syntax/#parallel
      parallel {
        // each worker is running the same command, 
        stage('tester A') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npx pwc --key ${env.CURRENTS_RECORD_KEY} --project-id ${env.CURRENTS_RECORD_KEY} --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID}"
          }
        }

        // second tester runs the same command
        stage('tester B') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npx pwc --key ${env.CURRENTS_RECORD_KEY} --project-id ${env.CURRENTS_RECORD_KEY} --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID}"
          }
        }
      }

    }
  }
}
```
{% endcode %}

### Using last failed flag with shards and orchestration

We have made available a [public repository with an example ](https://github.com/currents-dev/jenkins-last-failed)of how to setup last failed functionality using shards and orchestration in different machines.

Here you will be able to find the following Jenkinsfile that accepts two parameters:

* A CI Build ID from a previous run that you can use to apply the `--last-failed` flag. If this parameter is set, then the pipeline will automatically apply this tag and only run the failed tests from that run if found.
* A checkbox for knowing if you want to run an orchestrated run. If so, the pipeline will use `pwc-p` command instead of `pwc`.

<figure><img src="../../../.gitbook/assets/image (7).png" alt="" width="375"><figcaption><p>Pipeline Params</p></figcaption></figure>

In order to use the `--last-failed` flag, in addition to the project ID and record key, a Currents API key is needed (You can find it in the API Keys section in your dashboard).

{% hint style="info" %}
This example uses the API Key  and [`@currents/cmd` ](../../../resources/reporters/currents-cmd/currents-api.md) to query the API for the run corresponding to the CI Build ID and generates the `.last-run.json` file with that information.
{% endhint %}



Also, within the Jenkinsfile you can set different values as env variables for the total amount of shards `TOTAL_SHARDS` or the number of parallel jobs for orchestration `PARALLEL_JOBS.`

<details>

<summary><code>Jenkinsfile</code></summary>

```groovy
pipeline {
    agent any
    parameters {
        string(name: 'CI_BUILD_ID', defaultValue: 'none', description: 'Set this value if you want to execute only the failed tests from a specific run')
        booleanParam(name: 'IS_ORCHESTRATION', defaultValue: false, description: 'Set this value if you want to execute an orchestrated run')
    }
    environment {
        CURRENTS_PROJECT_ID = credentials('CURRENTS_PROJECT_ID')
        CURRENTS_RECORD_KEY = credentials('CURRENTS_RECORD_KEY')
        CURRENTS_CI_BUILD_ID = "reporter-${JOB_NAME}-${BUILD_ID}-${BUILD_NUMBER}"
        CURRENTS_API_KEY = credentials('CURRENTS_API_KEY')
        TOTAL_SHARDS = 3
        PARALLEL_JOBS = 4
    }
    options {
        timeout(time: 60, unit: 'MINUTES')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install'
                sh 'rm -rf test-results'
                sh 'rm -rf scripts/.last-run.json'
            }
        }

        stage('Set params CI Build ID') {
            steps {
                script {
                    env.CI_BUILD_ID = "${params.CI_BUILD_ID}"
                    echo "CI_BUILD_ID is set to: ${params.CI_BUILD_ID}"
                }
                echo "Verify values: ${env.CI_BUILD_ID} ${params.IS_ORCHESTRATION}"
            }
        }

        stage('Run Tests decision') {
            steps {
                runTestsDecision(env.CI_BUILD_ID, params.IS_ORCHESTRATION)
            }
        }
    }
}

def runTestsDecision(ciBuildId, isOrchestration) {
    if (ciBuildId && ciBuildId != 'none') {
        stage('Run Tests with last failed') {
            script {
                echo "Running tests with last failed: ${ciBuildId} ${env.TOTAL_SHARDS}"
                script {
                    sh 'node scripts/apiRequest.js'
                    sh 'cat scripts/.last-run.json'
                }
                if (isOrchestration && isOrchestration == true) {
                    runPlaywrightOrchestration(env.PARALLEL_JOBS.toInteger(), true)
                } else {
                    runPlaywrightSharded(env.TOTAL_SHARDS.toInteger(), true)
                }
            }
        }
    } else {
        stage('Run Tests') {
            script {
                echo 'Running tests'
                if (isOrchestration && isOrchestration == true) {
                    runPlaywrightOrchestration(env.PARALLEL_JOBS.toInteger(), false)
                } else {
                    runPlaywrightSharded(env.TOTAL_SHARDS.toInteger(), false)
                }
            }
        }
    }
}

def runPlaywrightSharded(shardTotal, lastFailed) {
    def parallelStages = [:]
    for (int i = 1; i <= shardTotal; i++) {
        def shardIndex = i
        parallelStages["shard${shardIndex}"] = {
            if (lastFailed) {
                sh "mkdir -p test-results/shard-${shardIndex}"
                sh "cp scripts/.last-run.json test-results/shard-${shardIndex}/.last-run.json"
                runPlaywrightTestsLastFailed(shardIndex, shardTotal)
            } else {
                runPlaywrightTests(shardIndex, shardTotal)
            }
        }
    }
    parallel parallelStages
}

def runPlaywrightTests(shardIndex, shardTotal) {
    stage("Run Playwright Tests - Shard ${shardIndex}") {
        script {
            def command = "npx pwc --shard=${shardIndex}/${shardTotal}"
            echo "Running command: ${command}"
            sh "${command}"
        }
    }
}

def runPlaywrightTestsLastFailed(shardIndex, shardTotal) {
    stage("Run Playwright Tests - Shard ${shardIndex}") {
        script {
            def command = "npx pwc --shard=${shardIndex}/${shardTotal} --last-failed --output test-results/shard-${shardIndex}"
            echo "Running command: ${command}"
            sh "${command}"
        }
    }
}

def runPlaywrightOrchestration(parallelTotal, lastFailed) {
    def parallelStages = [:]
    for (int i = 1; i <= parallelTotal; i++) {
        def parallelIndex = i
        parallelStages["parallel${parallelIndex}"] = {
            if (lastFailed) {
                sh "mkdir -p test-results/parallel-${parallelIndex}"
                sh "cp scripts/.last-run.json test-results/parallel-${parallelIndex}/.last-run.json"
                runPlaywrightTestsLastFailedOrchestration(parallelIndex)
            } else {
                runPlaywrightTestsOrchestration(parallelIndex)
            }
        }
    }
    parallel parallelStages
}

def runPlaywrightTestsOrchestration(parallelIndex) {
    stage("Run Playwright Tests - Orchestration ${parallelIndex}") {
        script {
            def command = "npx pwc-p"
            echo "Running command: ${command}"
            sh "${command}"
        }
    }
}

def runPlaywrightTestsLastFailedOrchestration(parallelIndex) {
    stage("Run Playwright Tests - Orchestration ${parallelIndex}") {
        script {
            def command = "npx pwc-p --last-failed --output test-results/parallel-${parallelIndex}"
            echo "Running command: ${command}"
            sh "${command}"
        }
    }
}
```



</details>

<details>

<summary><code>scripts/apiRequest.js</code></summary>

```javascript
const fs = require("fs");
const https = require("https");

// Encode the projectId and ciBuildId to ensure any special characters are URL-safe
const projectId = encodeURIComponent(process.env.CURRENTS_PROJECT_ID);
const ciBuildId = encodeURIComponent(process.env.CI_BUILD_ID);

const options = {
  hostname: "api.currents.dev",
  path: `/v1/runs/previous?projectId=${projectId}&ciBuildId=${ciBuildId}&pwLastRun=true`,
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.CURRENTS_API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    try {
      const parsedData = JSON.parse(data);
      fs.writeFileSync(
        "scripts/.last-run.json",
        JSON.stringify(parsedData.data.pwLastRun)
      );
    } catch (e) {
      console.log("Error: ", e);
    }
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
```

</details>



