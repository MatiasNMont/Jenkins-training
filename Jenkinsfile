pipeline {
    agent any
    stages {
        stage('install dependencies'){
            steps{
                sh 'echo install dependencies'
            }
        }
        stage('Build packages'){
            steps{
                sh 'echo build Package'
            }
        }

        stage('unit test'){
            when {
                branch 'develop'
            }
            steps{
                sh 'echo run unit-test'
            }
        }
        stage('Component test'){
            when{
                branch 'release'
            }
            steps{
                sh 'echo run component-test'
            }
        }

        stage('Security test'){
            steps{
                sh 'echo El test de seguridad termino correctamente'
            }
        }
    }
}
