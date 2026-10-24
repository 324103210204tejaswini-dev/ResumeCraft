pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/324103210204tejaswini-dev/ResumeCraft.git'
            }
        }

        stage('Build and Test') {
            steps {
                bat 'mvnd clean verify'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t resumecraft:1.0 .'
            }
        }

        stage('Check Kubernetes') {
            steps {
                bat 'kubectl version --client'
                bat 'kubectl get deployments'
            }
        }
    }

    post {
        success {
            echo 'ResumeCraft build, tests, and Docker image creation completed successfully!'
        }
        failure {
            echo 'The pipeline failed. Check the stage logs for details.'
        }
    }
}