pipeline {
    tools {nodejs "nodejs"}

    stages {
        stage('Checkout') {
        checkout scm
            sh 'env'
        }
        stage ('Install dependency') {
            sh 'npm install'
        } 
        stage ('Testing Stage') {
            sh 'npx ng test --no-watch --code-coverage'
        }
        stage('Sonar Scanner Coverage') {
            sh "npm run sonar"
        }
        stage('Make Prod Build') {
            sh 'npx ng build'
        }
        stage ('Deploy on this Server') {
            // TO DO 
        }
}

}