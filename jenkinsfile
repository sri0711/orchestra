pipeline {
  agent any
  environment {
    IMAGE_NAME = 'orchestra'
    IMAGE_TAG = "${BUILD_NUMBER}"
    HOST_PORT = '10100'
    CONTAINER_PORT = '80'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .'
      }
    }

    stage('Cleanup Old Images') {
      steps {
        sh '''#!/bin/sh
          echo "Cleaning old ${IMAGE_NAME} images, keeping the latest 2 versions..."
          docker images --format '{{.Repository}} {{.Tag}} {{.ID}} {{.CreatedAt}}' \
            | awk '$1 == "${IMAGE_NAME}" && $2 != "latest" {print $0}' \
            | sort -rk4,5 \
            | awk 'NR>2 {print $3}' \
            | xargs -r docker rmi -f || true
        '''
      }
    }

    stage('Run Docker Container') {
      steps {
        sh '''#!/bin/sh
          docker rm -f ${IMAGE_NAME} || true
          docker run -d --name ${IMAGE_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${IMAGE_NAME}:latest
        '''
      }
    }
  }

  post {
    always {
      sh 'docker ps -a'
    }
  }
}
