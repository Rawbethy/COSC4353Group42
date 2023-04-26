pipeline {
    agent {
        any { image 'node:16.13.1-alpine' }
    }
    
    tools {nodejs 'nodejs'}

    stages {
        stage('build') {
            steps {
                sh 'npm install'    
            } 
        }

        stage('test') {
            steps {
                sh 'npm run test'    
            }
        }
    }
}
