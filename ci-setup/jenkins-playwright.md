---
description: Running Playwright tests in parallel with Jenkins and Currents Dashboard
---

# Playwright - Jenkins

Here's an example of Jenkins pipeline that is running Playwright tests in parallel on 2 workers.&#x20;

The pipeline will be running 2 workers, based on `mcr.microsoft.com/playwright:v1.34.0-jammy` Docker image. Those workers will run all the tests in parallel.

The steps are:

* Use `mcr.microsoft.com/playwright:v1.34.0-jammy` as the base image
* Install the necessary dependencies: `playwright` and `@currents/playwright`
* Populate the environment variable `CURRENTS_RECORD_KEY` using [Jenkins Credentials Store](https://jenkins.io/doc/book/using/using-credentials/). Learn more about [record-key.md](../guides/record-key.md "mention")
* Populate the environment variable `CURRENTS_PROJECT_ID` using [Jenkins Credentials Store](https://jenkins.io/doc/book/using/using-credentials/).
* Run Playwright tests on 2 workers, using CI Build ID for "connecting" the workers to the same parallel run. See [cypress-ci-build-id.md](../guides/cypress-ci-build-id.md "mention").

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
