const fs = require("fs");
const mysql = require("mysql2")

class Config {
  constructor(config) {
    this.config = config;
  }

  put(key, value) {
    return this.config.put(key, value);
  }

  get(key) {
    return this.config.get(key);
  }

  remove(key) {
    return this.config.remove(key);
  }
}

class ConfigFileStorage {
  constructor(path) {
    this.path = path;
  }

  data() {
    return JSON.parse(fs.readFileSync(this.path, { encoding: "utf8" }).toString());
  }

  get(key) {
    const value = this.data()[0][key];
    console.log(value);
  }

  put(key, value) {
    const data = this.data().length ? this.data()[0] : {};
    data[key] = typeof value === "object" ? JSON.stringify(value) : value;
    fs.writeFileSync(this.path, JSON.stringify([data]), { encoding: "utf8" });
    console.log(this.data());
  }

  remove(key) {
    const data = this.data().length ? this.data()[0] : {};
    delete data[key];
    fs.writeFileSync(this.path, JSON.stringify([data]), { encoding: "utf8" });
    console.log(this.data());
  }
}

class ConfigMysql {
    constructor(config) {
        this.db = mysql.createConnection(config)
        this.db.connect()
    }

    get(key) {
        this.db.query("SELECT data FROM config", (error, result) => {
            const data = JSON.parse(JSON.parse(JSON.stringify(result))[0].data)
            console.log(data[key])
        })
    }

    put(key, value) {
        this.db.query("SELECT data FROM config", (error, result) => {
          const data = JSON.parse(JSON.parse(JSON.stringify(result))[0].data)
          data[key] = typeof value === "object" ? JSON.stringify(value) : value;
          this.db.query("UPDATE config set data = ? where id = ?", [JSON.stringify(data), 1])
          console.log(JSON.stringify(data))
        })
    }

    remove(key) {
        this.db.query("SELECT data FROM config", (error, result) => {
            const data = JSON.parse(JSON.parse(JSON.stringify(result))[0].data)
            delete data[key]
            this.db.query("UPDATE config set data = ? where id = ?", [JSON.stringify(data), 1])
            console.log(JSON.stringify(data))
        })
    }

    clear() {
      this.db.query("SELECT data FROM config", (error, result) => {
        this.db.query("UPDATE config set data = ? where id = ?", ["{}", 1])
      })
    }
}

// const config = new Config(new ConfigFileStorage("./oop/config.json"));
const config = new Config(new ConfigMysql({user: 'root', password: '', database: 'config'}));
config.put("site_name", "Blog"); // Be able to save string.
config.put("maintenance", false); // Be able to save boolean.
config.put("age", 30); // Be able to save number.
config.put("meta", { description: "lorem ipsum" }); // Be able to save object or array.
config.get("site_name");
config.put("site_name", "Perfect Blog"); // Will update the "site_name" with new value.
config.remove("site_name"); // Remove "site_name" key.
config.get("site_name");