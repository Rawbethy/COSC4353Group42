pipeline {
    agent any
    
    tools {nodejs 'Node'}

    stages {
        stage('build') {
            steps {
                dir('./server') {
                    sh 'npm install'    
                }     
            } 
        }

        stage('test') {
            steps {
                dir('./server') {
                    sh 'npm run test'    
                }      
            }
        }    
    }
}
