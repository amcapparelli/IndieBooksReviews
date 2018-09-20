class ConnectDB {
    constructor() {
        this.API = process.env.DB_HOST
    }
    async get (collection) {
        try {
            const conn = await fetch(this.API+collection)
            const data = await conn.json()
            return data
        } catch (error) {
            console.error('Hubo un error', error)
        }
    }

    async post (body, collection) {
        try {
            await fetch(this.API+collection, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(body)
    })
        return true;
        } catch (error) {
            console.error('hubo un error', error)
        }
        
}
}
    


export default ConnectDB