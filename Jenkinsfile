pipeline {
    agent any
    stages {
        stage('install dependencies'){
            steps{
                sh 'apt update'
                sh 'apt install -y nodejs npm'
            }
        }
        stage('Build packages'){
            steps{
                sh 'npm install'
            }
        }

        stage('Component test'){
            steps{
                sh 'npm run component-test'
            }
        }

        stage('Security test'){
            steps{
                sh 'cat security.conf'
            }
        }
    }
}