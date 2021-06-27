pipeline {
    agent any 
    stages {
        stage('instalations/prereq'){
            steps {
                sh 'apt-get update'
                sh 'curl -sL https://deb.nodesource.com/setup_14.x | bash -'
                sh 'apt-get install -y nodejs'
                sh 'node --version'
                sh 'npm --version'
            }
        }
        stage('Build') { 
            steps {
               dir("${env.WORKSPACE}/Jenkins-training/src/mundose-example/") {
                   sh 'rm package-lock.json'
                   sh 'git checkout develop'
                   sh "npm install"
                }
            }
        }
        stage('Test') { 
            steps {
                dir("${env.WORKSPACE}/Jenkins-training/src/mundose-example/") {
                   sh 'git checkout develop'
                   sh "npm run lint"
                   sh 'npm run test'
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