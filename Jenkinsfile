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
                bat 'docker build -t resumecraft:%BUILD_NUMBER% .'
            }
        }

        stage('Check Kubernetes') {
            steps {
                bat 'echo KUBECONFIG=%KUBECONFIG%'
                bat 'kubectl config current-context'
                bat 'kubectl get deployments'
            }
        }

        stage('Import Image into Kubernetes') {
            steps {
                bat 'docker save resumecraft:%BUILD_NUMBER% -o resumecraft.tar'
                bat 'docker cp resumecraft.tar desktop-control-plane:/root/resumecraft.tar'
                bat 'docker exec desktop-control-plane ctr -n k8s.io images import /root/resumecraft.tar'
                bat 'del resumecraft.tar'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl set image deployment/resumecraft-deployment resumecraft=resumecraft:%BUILD_NUMBER%'
                bat 'kubectl rollout status deployment/resumecraft-deployment --timeout=180s'
                bat 'kubectl get pods -l app=resumecraft'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: ResumeCraft has been built, tested, containerized, and deployed to Kubernetes!'
        }
        failure {
            echo 'FAILED: Check the Jenkins console output to identify the failed stage.'
        }
    }
}
