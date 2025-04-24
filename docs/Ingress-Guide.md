# Setup LiveKit Ingress Service
For Linux
---
1. Install Go
```
rm -rf /usr/local/go
tar -C /usr/local -xzf go1.24.2.linux-amd64.tar.gz
```
2. Add go to the path and check if it was succesful:
```
export PATH=$PATH:/usr/local/go/bin
go version
```
3. Create a go directory and edit the .bashrc file:
```
cd /home/username
mkdir go
vim .bashrc
```
- Add the GOPATH, go, and your GOPATH bin to the PATH variable:
```
export PATH=<other_paths>:/usr/local/go/bin:/home/username/go/bin:$PATH
```
4. Install and setup Homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
test -d ~/.linuxbrew && eval "$(~/.linuxbrew/bin/brew shellenv)"
test -d /home/linuxbrew/.linuxbrew && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.bashrc
sudo apt-get install build-essential procps curl file git
```
5. Install gstreamer
```
brew install gstreamer
```
6. Get the ingress repo
```
git clone https://github.com/livekit/ingress.git
cd ingress
```
7. Install Mage. To do this I believe that this can be done with `go install github.com/magefile/mage@latest` while in a go module (like the ingress repo).
8. Build the ingress binary:
```
mage build
```
9. At runtime, the ingress command (installed into your $GOPATH/bin) needs to be linked to the gstreamer library that was installed with Homebrew. This can seemingly be done with: 
```
export LD_LIBRARY_PATH=/home/linuxbrew/.linuxbrew/opt/glib/lib:$LD_LIBRARY_PATH
```
**NOTE**: Do not save this env var in .bashrc or etc/environment, as this will likely cause [issues](https://www.hpc.dtu.dk/?page_id=1180#:~:text=LD_LIBRARY_PATH%20tells%20the%20dynamic%20link,an%20application%20was%20linked%20against.).
10. OR create and run the script ingress-wrapper:
#!/bin/bash
export LD_LIBRARY_PATH=/home/linuxbrew/.linuxbrew/lib:$LD_LIBRARY_PATH
exec ingress "$@"


