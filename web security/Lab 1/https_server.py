import http.server
import ssl

server = http.server.HTTPServer(
    ('0.0.0.0', 4443),
    http.server.SimpleHTTPRequestHandler
)

server.socket = ssl.wrap_socket(
    server.socket,
    keyfile="key.pem",
    certfile="cert.pem",
    server_side=True
)

print("HTTPS Running...")
server.serve_forever()
