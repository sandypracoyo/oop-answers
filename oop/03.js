const { promises } = require('fs')

class Log {
    constructor(path) {
        this.level = [
            "Emergency",
            "Alert",
            "Critical",
            "Error",
            "Warning",
            "Notice",
            "Info",
            "Debug"
        ].map(x => x.toUpperCase())

        this.path = path
    }

    write(msg, level = this.level.length - 1) {
        const data = `[${new Date().toISOString()}] ${this.level[level]}: ${msg}\n`
        return promises.appendFile(this.path, data, { encoding: "utf8" }, error => {
            throw Error(error) 
        })
    }

    async force(callback) {
        try {
            return await callback
        } catch (error) {
            return console.log(error)
        }
    }

    emergency(msg) {
        this.force(this.write(msg, 0))
    }

    alert(msg) {
        this.force(this.write(msg, 1))
    }

    critical(msg) {
        this.force(this.write(msg, 2))
    }

    error(msg) {
        this.force(this.write(msg, 3))
    }

    warning(msg) {
        this.force(this.write(msg, 4))
    }

    notice(msg) {
        this.force(this.write(msg, 5))
    }

    info(msg) {
        this.force(this.write(msg, 6))
    }

    debug(msg) {
        this.force(this.write(msg, 7))
    }
    
    async filterByLevel(level = 0) {
        const data = await promises.readFile(this.path, { encoding: "utf8" })
        const filter = data.split("\n").filter(x => x.includes(this.level[level]))
        console.log(filter)
        return filter
    }
    
    async filterByDate(date = new Date().toISOString()) {
        const data = await promises.readFile(this.path, { encoding: "utf8" })
        const filter = data.split("\n").filter(x => x.includes(date))
        console.log(filter)
        return filter
    }
    
    async filterByMessage(msg) {
        const data = await promises.readFile(this.path, { encoding: "utf8" })
        const filter = data.split("\n").filter(x => x.includes(msg))
        console.log(filter)
        return filter
    }

    static instance(path) {
        return new this(path)
    }
}

const log = Log.instance('./oop/app.log')

log.emergency("System hung. Contact system administrator immediately!")
log.alert("Achtung! Achtung!")
log.critical("Medic!! We've got critical damages.")
log.error("We can't divide any numbers by zero.")
log.warning("Insufficient funds.")
log.notice("Someone loves your status.")
log.info("This is an information about something.")
log.debug("This is debug message.")