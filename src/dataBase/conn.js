class ConnectDB {
    constructor() {
        this.API = process.env.DB_HOST
    }
    async get (collection) {
        try {
            const conn = await fetch(this.API+collection)
            if (!conn.ok) {
                throw Error(conn.statusText)
            }
            const data = await conn.json()
            return data
        } catch (error) {
            console.error('Hubo un error', error)
        }
    }

    async post (body, collection) {
        try {
            const conn = await fetch(this.API+collection, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(body)
    }); if (!conn.ok) {
        throw Error(conn.statusText)
        }
        return true;
        } catch (error) {
            console.error('hubo un error', error)
        }
        
}
}
    


export default ConnectDB