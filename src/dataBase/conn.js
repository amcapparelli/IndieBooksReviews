class ConnectDB {
    constructor() {
        this.API = process.env.DB_HOST
    }
    async get () {
        try {
            const conn = await fetch(this.API +'/'+'reviews')
            const data = await conn.json()
            return data
        } catch (error) {
            console.error('Hubo un error', error)
        }
    }

    async post (body) {
        try {
            await fetch(this.API+'/'+'comments' , {
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