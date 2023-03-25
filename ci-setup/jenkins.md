---
description: Running cypress tests in parallel with Jenkins and Currents Dashboard
---

# Jenkins

Here's an example of Jenkins pipeline that is running cypress tests in parallel on 2 workers and is connected to Currents Dashboard for orchestrating the parallel runs and reporting the results.&#x20;

The pipeline will be running 2 workers, based on `cypress/base:16` Docker image. Those workers will run all the tests in parallel.

The steps are:

* Use `cypress/base:18` as the base image
* Install the necessary dependencies: `cypress` and `cypress-cloud`
* Populate the environment variable `CURRENTS_RECORD_KEY` using [Jenkins Credentials Store](https://jenkins.io/doc/book/using/using-credentials/). Learn more about [record-key.md](../guides/record-key.md "mention")
* Run cypress tests on 2 workers, using CI Build ID for "connecting" the workers to the same parallel run. See [parallelization.md](../guides/parallelization.md "mention") and [cypress-ci-build-id.md](../guides/cypress-ci-build-id.md "mention").

```
npx cypress-cloud run --parallel --record --key ${env.CURRENTS_RECORD_KEY} --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID}"
```

Here's the full Jenkins pipeline configuration file:

```groovy
pipeline {
  agent {
    // this image provides everything needed to run Cypress
    docker {
      image 'cypress/base:18'
    }
  }

  stages {
    // installs node dependencies and Cypress binary
    stage('build') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh 'npm install cypress cypress-cloud'
      }
    }

    // this stage runs cypress tests, and each agent uses the workspace
    // from the previous stage
    stage('cypress parallel tests') {
      environment {
        // see https://jenkins.io/doc/book/using/using-credentials/
        CURRENTS_RECORD_KEY = credentials('currents-record-key')
        // Prevent deletion of videos to avoid race condition
        CYPRESS_trashAssetsBeforeRuns = 'false'
      }

      // Run parallel workers, see:
      // https://jenkins.io/doc/book/pipeline/syntax/#parallel
      parallel {
        // each worker is running the same command, 
        // Currents Dashboard will orchestrate the tests between 
        // the workers
        stage('tester A') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npx cypress-cloud run --parallel --record --key ${env.CURRENTS_RECORD_KEY} --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID}"
          }
        }

        // second tester runs the same command
        stage('tester B') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npx cypress-cloud run --parallel --record --key ${env.CURRENTS_RECORD_KEY} --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID}"
          }
        }
      }

    }
  }
}
```
