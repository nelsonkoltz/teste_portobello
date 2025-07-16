FROM eclipse-temurin:17-jdk-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o JAR gerado do Maven/Gradle para o container
COPY target/*.jar app.jar

# Força o profile 'default' para garantir que application.properties seja carregado
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=default"]
