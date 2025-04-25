# Ingress Service Guide on Ubuntu

- This guide is tailored for Ubuntu 22.04 and utilizes docker to run the ingress service. 

### Redis

- Modify the Redis config file `sudo vim /etc/redis/redis.conf` by changing the following:
    - `bind 127.0.0.1 ::1` --> `bind 0.0.0.0`
    - `protected-mode yes` --> `protected-mode no`

- Start (or restart if already running) the redis server:
```
sudo systemctl start redis-server 
```

### LiveKit Server

- Create a YAML configuration file for the livekit server with `vim livekit.yaml` and add the following:
```
port: 7880
log_level: info
rtc:
  tcp_port: 7881
  port_range_start: 50000
  port_range_end: 60000
redis:
  address: localhost:6379
ingress:
  rtmp_base_url: rtmp://<host_ip>
keys:
    <api_key>: <api_secret>
```

- Start the livekit server:
```
livekit-server --config livekit.yaml
```

### Ingress Service (Docker)

- Make a configuration file for the ingress service with `vim ingress.yaml` and add the following:
```
log_level: debug
api_key: <api_key>
api_secret: <api_secret>
ws_url: ws://<host_ip>:7880
redis:
  address: <host_ip>:6379
```

- Run the docker container.
```
run --rm -e INGRESS_CONFIG_BODY="`cat ./ingress.yaml`" -p 1935:1935 -p 8080:8080 livekit/ingress
```
- **Note** the opening of ports 1935 (RTMP) and 8080 (WHIP) as these are the defaults (set via the ingress.yaml config file).

### Ingress Creation

- Create an ingress creation config with `vim ingress.json` and add the following:
```
{
	"input_type": 0, 
	"name": "<some_string>",
	"room_name": <some_string>,
	"participant_identity": <some_string>,
	"participant_name": <some_string>
}
```
- **Note** the input type of `0` is for RTMP and `1` indicates WHIP.

- Create the ingress (with the livekit cli or the ingress api), for example:
```
lk ingress create --config ingress.json
```
- This will output the RTMP URL and the stream key needed in OBS.

### Streaming

- In OBS Settings > Stream set the server to **rtmp://<host_ip>:1935** and set the stream key.

- Start Streaming!

