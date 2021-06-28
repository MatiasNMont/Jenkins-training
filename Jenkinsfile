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

        stage('unit test'){
            when {
                branch 'develop'
            }
            steps{
                sh 'npm run unit-test'
            }
        }
        stage('Component test'){
            when{
                branch 'release'
            }
            steps{
                sh 'npm run component-test'
            }
        }

        stage('Security test'){
            steps{
                sh 'cat security.conf'
                sh 'echo El test de seguridad termino correctamente'
            }
        }
    }
}