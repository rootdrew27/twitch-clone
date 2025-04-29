# Redis Setup

- Modify the Redis config file `sudo vim /etc/redis/redis.conf` by changing the following:
    - `bind 127.0.0.1 ::1` --> `bind 0.0.0.0`
    - `#aclfile /etc/redis/users.acl` --> `aclfile /etc/redis/users.acl`

- Create the aclfile `sudo vim /etc/redis/users.acl` and add the following:
```
user <username> on >password ~* &* +@all
```
- See Redis docs on [ACL](https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/) and [Permissions](https://redis.io/docs/latest/operate/rc/security/access-control/data-access-control/configure-acls/) for more info.

- Start (or restart if already running) the redis server:
```
sudo systemctl start redis-server 
```