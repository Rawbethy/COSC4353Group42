pipeline {
    agent any
    
    tools {nodejs 'Node'}

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
