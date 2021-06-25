pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                sh 'echo You profile is $PROFILE'
            }
        }
        stage('Test') { 
            steps {
                sh 'pwd'
            }
        }
        stage('Deploy') { 
            steps {
                sh 'echo Deployando component'
            }
        }
    }
}