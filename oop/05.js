const data = {
  author_id: 43,
  title: "Lorem ipsum",
  body: "<p><strong>Lorem ipsum</strong> dolor sit amet</p>",
  created_at: new Date().toISOString(),
  tags: ["hello", "world"]
};

const https = require('https')

class Http {
    static get(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                res.setEncoding("utf8")
                let data = ""
                res.on("data", body => data += body)
                res.on("end", () => resolve(data))
            }).on("error", error => reject(error))
        })
    }

    static option(method) {
        return {
            method,
            headers: {
                "Content-Type": "application/json"
            }
        }
    }

    static put(url, data) {
        return new Promise((resolve, reject) => {
            const request = https.request(new URL(url), this.option("PUT"), (res) => {
                res.setEncoding("utf8")
                let result = ""
                res.on("data", body => result += body)
                res.on("end", () => resolve(result))
            }).on("error", error => reject(error))
            request.write(JSON.stringify(data))
            request.end()
        })
    }

    static patch(url, data) {
        return new Promise((resolve, reject) => {
            const request = https.request(new URL(url), this.option("PATCH"), (res) => {
                res.setEncoding("utf8")
                let result = ""
                res.on("data", body => result += body)
                res.on("end", () => resolve(result))
            }).on("error", error => reject(error))
            request.write(JSON.stringify(data))
            request.end()
        })
    }

    static post(url, data) {
        return new Promise((resolve, reject) => {
            const request = https.request(new URL(url), this.option("POST"), (res) => {
                res.setEncoding("utf8")
                let result = ""
                res.on("data", body => result += body)
                res.on("end", () => resolve(result))
            }).on("error", error => reject(error))
            request.write(JSON.stringify(data))
            request.end()
        })
    }

    static delete(url, data) {
        return new Promise((resolve, reject) => {
            const request = https.request(new URL(url), this.option("DELETE"), (res) => {
                res.setEncoding("utf8")
                let result = ""
                res.on("data", body => result += body)
                res.on("end", () => resolve(result))
            }).on("error", error => reject(error))
            request.write(JSON.stringify(data))
            request.end()   
        })
    }

    static options(url) {
        return new Promise((resolve, reject) => {
            const request = https.request(new URL(url), this.option("OPTIONS"), (res) => {
                res.setEncoding("utf8")
                let result = ""
                res.on("data", body => result += body)
                res.on("end", () => resolve(result))
            }).on("error", error => reject(error))
            request.end()   
        })
    }

    static head(url) {
        return new Promise((resolve, reject) => {
            const request = https.request(new URL(url), this.option("HEAD"), (res) => {
                res.setEncoding("utf8")
                let result = ""
                res.on("data", body => result += body)
                res.on("end", () => resolve(result))
            }).on("error", error => reject(error))
            request.end()   
        })
    }
}

Http.get("https://httpbin.org/get").then(value => console.log("GET", value)).catch(error => console.log(error))
Http.post("https://httpbin.org/post", data).then(value => console.log("POST", value)).catch(error => console.log(error))
Http.put("https://httpbin.org/put", data).then(value => console.log("PUT", value)).catch(error => console.log(error))
Http.patch("https://httpbin.org/patch", data).then(value => console.log("PATCH", value)).catch(error => console.log(error))
Http.delete("https://httpbin.org/delete", data).then(value => console.log("DELETE", value)).catch(error => console.log(error))
Http.options("https://httpbin.org/options").then(value => console.log("OPTIONS", value)).catch(error => console.log(error))
Http.head("https://httpbin.org/head").then(value => console.log("HEAD", value)).catch(error => console.log(error))
