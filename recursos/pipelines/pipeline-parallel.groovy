pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                sh 'echo You profile is $PROFILE'
            }
        }
        stage('Test') { 
            parallel {
                stage('syntax'){
                    steps {
                        sh 'echo syntax test'
                    }
                }
                stage('unit'){
                    steps {
                        sh 'echo unit test'
                    }
                }
            }
        }
        stage('Deploy') { 
            steps {
                sh 'echo Deployando component'
            }
        }
    }
}