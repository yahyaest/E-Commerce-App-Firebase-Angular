node {
    stage('Checkout') {
        sh "xcopy /E /exclude:D:\\Workspaces\\vscode_workspace\\gift-shop-monolith\\frontend\\ignore.txt D:\\Workspaces\\vscode_workspace\\gift-shop-monolith\\frontend /Y"
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