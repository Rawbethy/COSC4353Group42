pipeline {
  agent any
  
  stages {
    stage('test') {
      steps {
        dir('./server') {
          sh 'npm run test' 
        }
      } 
    }
  }
}
