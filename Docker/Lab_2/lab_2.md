# Lab 2

# Problem 1 — Docker Volumes (Volume Mount)

## Create Docker volumes

```bash
docker volume create nginx-html
docker volume create nginx-config
```

## Run nginx container with two volumes

```bash
docker run -d \
--name my-nginx \
-v nginx-html:/usr/share/nginx/html \
-v nginx-config:/etc/nginx \
nginx
```

output:

```bash
fe152c012e5b6fdfb9cbb6dc83ea42c63916c09552ef6921c2e8eb77f73b83d9
```

## Enter container and edit html file

```bash
docker exec -it my-nginx bash
```

```bash
echo "<h1>Hello From Volume</h1>" > /usr/share/nginx/html/index.html
```

```bash
exit
```

output:

```bash
root@fe152c012e5b:/# echo "<h1>Hello From Volume</h1>" > /usr/share/nginx/html/index.html
root@fe152c012e5b:/# exit
exit
```

## Remove container

```bash
docker rm -f my-nginx
```

output:

```bash
my-nginx
```

## Run first container using same volumes

```bash
docker run -d \
--name nginx1 \
-v nginx-html:/usr/share/nginx/html \
-v nginx-config:/etc/nginx \
-p 8080:80 \
nginx
```

output:

```bash
4a70d07e9d98842eca31c6fe11332c662b4bdfa066c80e58148a623aead97d85
```

## Open browser

```text
http://localhost:8080
```

output:

```text
Hello world from nginx
```

## Run second container using same volumes

```bash
docker run -d \
--name nginx2 \
-v nginx-html:/usr/share/nginx/html \
-v nginx-config:/etc/nginx \
-p 8081:80 \
nginx
```

output:

```bash
b0747a03445fad66b08b4bb9b1a6894f65b76d37da66a1aac7e5e60a26df9731
```

## Open browser

```text
http://localhost:8081
```

output:

```text
Hello From Volume
```

---

# Problem 2 — Bind Mount

## Create folders

```bash
mkdir html
mkdir config
```

## Create html file

```bash
echo "<h1>Hello From Bind Mount</h1>" > html/index.html
```

## Run nginx container using bind mount

```bash
docker run -d \
--name nginx-bind-mount \
-v $(pwd)/html:/usr/share/nginx/html \
-v $(pwd)/config:/etc/nginx \
nginx
```

output:

```bash
e29b66d4e68efedb1d37726aac3ea7fabc2527820a2f11329069a0558319d02d
```

## Remove container

```bash
docker rm -f nginx-bind-mount
```

output:

```bash
nginx-bind-mount
```

## Run new container with same bind mount

```bash
docker run -d \
--name nginx-bind-mount-2 \
-v $(pwd)/html:/usr/share/nginx/html \
-v $(pwd)/config:/etc/nginx \
-p 8080:80 \
nginx
```

output:

```bash
236468902a3e4ff5c9a62ddddf6f8c49368f6a251b32de4a9ed40f43e9ebe8dc
```

## Open browser

```text
http://localhost:8080
```

output:

```text
Hello From Bind Mount
```

---

# Problem 3 — Docker Networks

## Create bridge networks

```bash
docker network create net1
```

output:

```bash
91ba17445d9ce3c1709f779d16bd8f3b3785f55269bb53a1e5209928ccef08cb
```

```bash
docker network create net2
```

output:

```bash
588aec984dc1ecfa470fc0a7e179da965ceb19cc1d5ad6ce91416ddabd9ab096
```

## Run nginx containers

```bash
docker run -d \
--name nginx1 \
--network net1 \
nginx
```

```bash
docker run -d \
--name nginx2 \
--network net2 \
nginx
```

## Start nginx1 container

```bash
docker start nginx1
```

output:

```bash
nginx1
```

## Enter nginx1 container

```bash
docker exec -it nginx1 bash
```

## Install curl

```bash
apt update && apt install curl -y
```

## Curl nginx2 container

```bash
curl nginx2
```

output:

```html
<h1>Hello From Volume</h1>
```

---

# Problem 4 — Docker Compose

## Create docker-compose.yml

```yaml
version: "3.8"

services:
  nginx:
    image: nginx
    container_name: compose-nginx

    ports:
      - "8080:80"

    depends_on:
      - mysql

  mysql:
    image: mysql:latest
    container_name: compose-mysql

    environment:
      MYSQL_ROOT_PASSWORD: P4sSw0rd0!

    ports:
      - "3306:3306"
```

## Run docker compose

```bash
docker compose up -d
```

output:

```bash
time="2026-05-24T23:09:58+03:00" level=warning msg="D:\\ITI\\ITI-Intake-46---Open-Source\\Docker\\Lab_2\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"

[+] up 2/3
 ✔ Network lab_2_default   Created
 ✔ Container compose-mysql Started
 - Container compose-nginx Starting

Error response from daemon: failed to set up container networking:
driver failed programming external connectivity on endpoint compose-nginx:
Bind for 0.0.0.0:8080 failed: port is already allocated
```

## Check running containers

```bash
docker compose ps
```

output:

```bash
time="2026-05-24T23:10:11+03:00" level=warning msg="D:\\ITI\\ITI-Intake-46---Open-Source\\Docker\\Lab_2\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"

NAME            IMAGE          COMMAND                  SERVICE   CREATED          STATUS          PORTS
compose-mysql   mysql:latest   "docker-entrypoint.s…"   mysql     12 seconds ago   Up 12 seconds   0.0.0.0:3306->3306/tcp, [::]:3306->3306/tcp
```

## Stop docker compose

```bash
docker compose down
```

output:

```bash
time="2026-05-24T23:11:28+03:00" level=warning msg="D:\\ITI\\ITI-Intake-46---Open-Source\\Docker\\Lab_2\\docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"

[+] down 3/3
 ✔ Container compose-nginx Removed
 ✔ Container compose-mysql Removed
 ✔ Network lab_2_default Removed
```
