# Metabase

Metabase is the easy, open-source way for everyone in your company to ask questions and learn from data.

![Metabase Product Screenshot](docs/images/metabase-product-screenshot.png)

---

You will need to use WSL, if on windows. On Mac or Linux, you can skip this step and use bash.
Run these on Powershell to install WSL.

```bash
wsl --install
wsl --set-default-version 2
```

### Clone the repo

```bash
git clone https://github.com/REODigital/metabase-demo.git
cd ~/metabase-demo
```

### Install dependencies

```bash
install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install 22
nvm use 22
sudo apt update
sudo apt install openjdk-21-jdk -y
sudo apt install build-essential -y
curl -O https://download.clojure.org/install/linux-install-1.12.0.1488.sh
chmod +x linux-install-1.12.0.1488.sh
sudo ./linux-install-1.12.0.1488.sh
corepack enable
corepack prepare yarn@1.22.22 --activate
yarn install --ignore-scripts
./bin/i18n/build-translation-resources
./bin/build-drivers.sh
```

### Start the frontend in a WSL / Bash instance

```bash
yarn build-hot
```

### Start the backend in another WSL / Bash instance

```bash
clojure -M:run
```

### Preview the build @ http://localhost:3000

---

## Resources

### Clear DB and Local storage

Run these commands to clear data in local env, if you've created an account, want to clear DB, etc.

```bash
rm -rf target/cljs_dev/*
rm -rf node_modules/.cache
rm -rf resources/frontend_client/app/dist
rm -rf target/classes/frontend_client/app/dist
rm -rf node_modules/.cache
rm -f metabase.db.mv.db
rm -f metabase.db.trace.db
```
