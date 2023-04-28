pipeline {
    agent any

    stages {
        stage('build') {
            sh 'npm install'
        }

        stage('test') {
            sh 'npm run test'
        }
    }
}
