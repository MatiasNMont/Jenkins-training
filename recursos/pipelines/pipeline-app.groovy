// ATENCION: Los siguientes lineas no se deben copiar en el pipeline son solo de guia,copiar desde la 
// linea 17 siguiendo los pasos descriptos abajo antes de ejecutar el pipeline
// prerequisitos:
//     1. Instalar el plugin de Docker:
//         - Panel de control -> Administrar Jenkins -> [System Configuration] Administrar Plugins ->
//         -> click en Todos los Plugins -> buscar 'Docker pipeline' -> click en install without restart
//     2. Aniadir las credenciales de dockerhub:
//             Panel de control -> Administrar Jenkins -> [Security] Manage Credentials ->
//         -> click en el nombre del store (jenkins) -> click global credentials ->
//         click add credentials con la siguiente configuracion:
//             - Kind: Username with password
//             - Username: Tu username de dockerhub
//             - Password: tu password
//             - Id: para este ejemplo rellenarlo con 'dockerhub_id'
//             - Description: La descripcion que tu quieras

pipeline {
    environment { 
        registry = "matiasnmont/mundose-jenkins"
        registryCredential = 'dockerhub_id'
        dockerImage = '' 
    }
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
                dir("${env.WORKSPACE}/Jenkins-training/src/mundose-example/"){
                    script { 
                    dockerImage = docker.build registry + ":$BUILD_NUMBER" 
                }
                 script {
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                 } 
                }
            } 
        }
    }
}