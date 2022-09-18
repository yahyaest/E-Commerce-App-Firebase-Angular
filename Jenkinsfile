pipeline {
    agent any

    tools { nodejs 'nodejs' }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh "export CHROME_BIN='/usr/bin/google-chrome'"
                sh 'export FIREFOX_BIN=/usr/bin/firefox'
                sh 'env'
            }
        }
        stage('Install dependency') {
            steps {
                sh 'npm install'
            }
        }
        stage('Testing Stage') {
            steps {
                sh 'npx ng test --no-watch --code-coverage'
            }
        }
        stage('Sonar Scanner Coverage') {
            steps {
                sh 'npm run sonar'
            }
        }
        stage('Make Prod Build') {
            steps {
                sh 'npx ng build'
            }
        }
        stage('Deploy on this Server') {
            steps {
                // TO DO
                echo 'Done'
            }
        }
    }
}
