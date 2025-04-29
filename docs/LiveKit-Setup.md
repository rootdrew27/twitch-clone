# LiveKit Setup (Local)

This guide is tailored for Ubuntu 22.04 and utilizes LiveKit's docker image to run the ingress service. 

## Prerequisites

Ensure that Redis is configured properly with a user (besides the default). See the [Redis Setup](docs\Redis-Setup.md) for details. Additionally, setup Docker. See the [Docker's Guide](https://docs.docker.com/desktop/setup/install/linux/ubuntu/) for details.

## LiveKit Server

- Create a YAML configuration file for the livekit server with `vim livekit.yaml` and add the following:
```
port: 7880
log_level: info
rtc:
  tcp_port: 7881
  port_range_start: 50000
  port_range_end: 60000
redis:
  address: <host_ip>:6379
ingress:
  rtmp_base_url: rtmp://<host_ip>
keys:
    <api_key>: <api_secret>
```
- **Note** that your `<host_ip>` is not localhost or 127.0.0.1, it is the IP of device on your network.

- Start the livekit server:
```
livekit-server --config livekit.yaml
```

## Ingress Service (Docker)

- Make a configuration file for the ingress service with `vim ingress.yaml` and add the following:
```
log_level: debug
api_key: <api_key>
api_secret: <api_secret>
ws_url: ws://<host_ip>:7880
redis:
  address: <host_ip>:6379
```

- Start the docker daemon
- Run the docker container.
```
docker run --rm -e INGRESS_CONFIG_BODY="`cat ./ingress.yaml`" -p 1935:1935 -p 8080:8080 livekit/ingress
```
- **Note** the opening of ports 1935 (RTMP) and 8080 (WHIP) as these are the defaults (set via the ingress.yaml config file).

## Ingress Creation

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
lk ingress create ingress.json
```
- This will output the RTMP URL and the stream key needed in OBS.

## Streaming

- In OBS Settings > Stream set the server to **rtmp://<host_ip>:1935** and set the stream key.

- Start Streaming!

