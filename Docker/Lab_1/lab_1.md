# Docker Lab 1

# Difference Between CMD & ENTRYPOINT

Both `CMD` and `ENTRYPOINT` are used to define what runs when a Docker container starts.

## CMD
`CMD` sets a default command that can be easily overridden when running the container.  
It is mainly used for default behavior.

Example:
```dockerfile
CMD ["python", "app.py"]
```

## ENTRYPOINT
`ENTRYPOINT` sets the main executable of the container, and any extra command becomes arguments for it.  
It is used when the container should always run a specific command.

Example:
```dockerfile
ENTRYPOINT ["python"]
```

---

# Difference Between COPY & ADD

Both `COPY` and `ADD` are used to transfer files into a Docker image.

## COPY
`COPY` only copies files and folders from the host machine into the container.

Example:
```dockerfile
COPY . /app
```

## ADD
`ADD` does the same thing, but it also supports extra features like:
- Extracting `.tar` files automatically.
- Downloading files from URLs.

Example:
```dockerfile
ADD archive.tar.gz /app
```

---

# Problem 1

## Run hello-world container
```bash
docker run hello-world
```

## Check container status
```bash
docker ps -a
```

Output:
```bash
CONTAINER ID   IMAGE         COMMAND    CREATED              STATUS                          PORTS     NAMES
4fcfe9667db0   hello-world   "/hello"   About a minute ago   Exited (0) About a minute ago   strange_galois
```

## Start the stopped container
```bash
docker start -a 4fcfe9667db0
```

Output:
```bash
Hello from Docker!
```

## Remove the container
```bash
docker rm 4fcfe9667db0
```

## Remove the image
```bash
docker rmi hello-world
```

Output:
```bash
Untagged: hello-world:latest
Deleted: sha256:0e760fdfbc48ba8041e7c6db999bb40bfca508b4be580ac75d32c4e29d202ce1
```

---

# Problem 2

## Run Ubuntu container in interactive mode
```bash
docker run -it ubuntu bash
```

## Run echo command inside container
```bash
echo docker
```

Output:
```bash
docker
```

## Create file inside the container
```bash
touch hello-docker
```

## Exit from the container
```bash
exit
```

Output:
```bash
exit
```

## Check container status
```bash
docker ps -a
```

Output:
```bash
CONTAINER ID   IMAGE     COMMAND   CREATED         STATUS                     PORTS     NAMES
8a6c8dc20a77   ubuntu    "bash"    3 minutes ago   Exited (0) 1 minute ago              practical_zhukovsky
```

## Stop the container
```bash
docker stop 8a6c8dc20a77
```

## Remove the container
```bash
docker rm 8a6c8dc20a77
```

## Comment about hello-docker file
The file `hello-docker` was deleted after removing the container because containers are ephemeral unless volumes are used.

## Remove all stopped containers
```bash
docker container prune
```

Output:
```bash
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Total reclaimed space: 0B
```

> Total reclaimed space is `0B` because the container was already removed manually.

---

# Problem 3

## Deploy MySQL database container

### Run MySQL container in background
```bash
docker run -d \
--name app-database \
-e MYSQL_ROOT_PASSWORD=P4sSw0rd0! \
mysql:latest
```

Output:
```bash
Digest: sha256:c11782aa2a96624c1efc121768641d96954faa136d6aa82751b032d8c426ffbc
Status: Downloaded newer image for mysql:latest
347e6d851cb98f0a3cd0bff5e01fe593458d51c2547cedb10a2b417f20dbc53d
```

---

# Problem 4

## Run Nginx container
```bash
docker run -d --name mynginx -p 8080:80 nginx
```

Output:
```bash
Digest: sha256:5aca99593157f4ae539a5dec1092a0ad8762f8e2eb1789085a13a0f5622369f6
Status: Downloaded newer image for nginx:latest
2db90a585f4864aa8a2e5c12324d7815c37e6b04545b608dc160a508980f2441
```

## Create HTML file
```bash
echo "<h1>Hello world from nginx</h1>" > index.html
```

## Copy HTML file into container
```bash
docker cp index.html mynginx:/usr/share/nginx/html/
```

Output:
```bash
Successfully copied 32B (transferred 2.05kB) to mynginx:/usr/share/nginx/html/
```

## Open browser
```text
http://localhost:8080
```

Output:
```text
Hello world from nginx
```

## Commit container as image
```bash
docker commit mynginx nginx
```

Output:
```bash
sha256:a3f7c3cbbe8bde3c3b21960a47de9aeae63d59916d03e6a036e60059b66eef38
```

---

# Problem 5

## Create Python app

### Create app.py
```bash
echo 'print("Hello Docker")' > app.py
```

## Create Dockerfile
```bash
touch dockerfile
```

## Add Dockerfile content
```dockerfile
FROM python:3.11

WORKDIR /app

COPY app.py .

CMD ["python", "app.py"]
```

## Build Docker image
```bash
docker build -t python-app .
```

## Run Docker container
```bash
docker run python-app
```

Output:
```bash
Hello Docker
```

---

# Bonus — Multi-stage Smaller Image

## Create smaller Dockerfile
```dockerfile
FROM python:3.11-slim AS builder

WORKDIR /app

COPY app.py .

FROM python:3.11-alpine

WORKDIR /app

COPY --from=builder /app/app.py .

CMD ["python", "app.py"]
```

## Build smaller image
```bash
docker build -t python-app-small .
```

Output:
```bash
[+] Building 68.8s FINISHED
```

---

# Push Image to Docker Hub

## Login to Docker Hub
```bash
docker login
```

Output:
```bash
Authenticating with existing credentials... [Username: abdoibrahim7]
Login Succeeded
```

## Tag image
```bash
docker tag python-app-small abdoibrahim7/python-app-small:v1
```

## Push image
```bash
docker push abdoibrahim7/python-app-small:v1
```

Output:
```bash
The push refers to repository [docker.io/abdoibrahim7/python-app-small]
fc153c0d3584: Pushed
1b6bd309a2ac: Pushed
fd8e41ac7277: Pushed
5c671a5c7ab3: Pushed
```