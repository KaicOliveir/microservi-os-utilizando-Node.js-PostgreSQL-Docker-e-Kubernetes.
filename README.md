Pedidos Veloz – Arquitetura de Microsserviços com Kubernetes
📌 Descrição do Projeto

O Pedidos Veloz é um sistema baseado em microsserviços desenvolvido em Node.js, utilizando:

Docker para containerização

Kubernetes (Kind) para orquestração

PostgreSQL como banco de dados

Gateway para centralizar as requisições

O sistema é composto pelos seguintes serviços:

Gateway

Pedidos

Estoque

Pagamentos

PostgreSQL

🛠️ Tecnologias Utilizadas

Node.js

Docker

Kubernetes (Kind)

kubectl

PostgreSQL

Axios

🚀 Como Executar o Projeto
1️⃣ Pré-requisitos

Antes de iniciar, é necessário ter instalado:

Docker Desktop

Kind

kubectl

Node.js

Verifique:

docker --version
kind version
kubectl version --client
node -v

2️⃣ Criar o Cluster Kubernetes

Criar o cluster com o nome:

kind create cluster --name loja-veloz


Verificar se está funcionando:

kubectl get nodes


Deve aparecer:

loja-veloz-control-plane   Ready

3️⃣ Build das Imagens Docker

⚠️ IMPORTANTE: Execute os comandos dentro da pasta raiz do projeto.

Gateway
docker build -t pedidos-veloz-gateway ./gateway

Pedidos
docker build -t pedidos-veloz-pedidos ./pedidos

Estoque
docker build -t pedidos-veloz-estoque ./estoque

Pagamentos
docker build -t pedidos-veloz-pagamentos ./pagamentos

4️⃣ Carregar as Imagens no Kind

Como o cluster é local, precisamos carregar as imagens manualmente:

kind load docker-image pedidos-veloz-gateway --name loja-veloz
kind load docker-image pedidos-veloz-pedidos --name loja-veloz
kind load docker-image pedidos-veloz-estoque --name loja-veloz
kind load docker-image pedidos-veloz-pagamentos --name loja-veloz

5️⃣ Aplicar os Arquivos YAML

Entrar na pasta k8s:

cd k8s


Aplicar todos os arquivos:

kubectl apply -f .


Ou aplicar individualmente:

kubectl apply -f postgres-secret.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f pedidos-deployment.yaml
kubectl apply -f gateway-deployment.yaml

6️⃣ Verificar se os Pods estão Rodando
kubectl get pods


Todos devem estar com:

STATUS: Running


Verificar serviços:

kubectl get svc

🌐 7️⃣ Testar no Navegador

O Gateway está configurado como NodePort.

Descubra a porta:

kubectl get svc


Exemplo:

gateway   NodePort   8080:30007/TCP


Acessar no navegador:

http://localhost:30007


Ou testar endpoints:

http://localhost:30007/pedidos
http://localhost:30007/estoque
http://localhost:30007/pagamentos

📈 8️⃣ Testar Escalabilidade

Escalar o serviço de pedidos:

kubectl scale deployment pedidos --replicas=4


Verificar:

kubectl get pods

🗄️ Banco de Dados

O PostgreSQL está rodando dentro do cluster com:

Service: ClusterIP

Porta: 5432

Credenciais armazenadas em Secret

📌 Estrutura do Projeto
pedidos-veloz/
│
├── gateway/
├── pedidos/
├── estoque/
├── pagamentos/
├── k8s/
└── README.md

✅ Funcionalidades Implementadas

Arquitetura baseada em microsserviços

Comunicação entre serviços via HTTP

Banco de dados PostgreSQL

Orquestração com Kubernetes

Escalabilidade horizontal

Gateway centralizador

Containerização com Docker

👨‍💻 Autor

Kaic Bispo
Projeto acadêmico – Microsserviços com Kubernetes