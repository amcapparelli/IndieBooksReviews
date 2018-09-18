

    async function connect () {
        try {
            const conn = await fetch(process.env.DB_HOST)
            const data = await conn.json()
            return data
        } catch (error) {
            console.error('Hubo un error', error)
        }
    }


export default connect