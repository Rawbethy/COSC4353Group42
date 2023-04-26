pipeline {
    agent {
        docker { image 'node:16.13.1-alpine' }
    }

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
