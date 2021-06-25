pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                sh 'echo Buildeando componente'
            }
        }
        stage('Test') { 
            steps {
                sh 'echo Testeando componente'
            }
        }
        stage('Deploy') { 
            steps {
                sh 'echo Deployando component'
            }
        }
    }
}