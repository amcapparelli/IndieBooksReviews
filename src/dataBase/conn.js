async function connect () {
    try {
        const conn = await fetch('http://localhost:8000/reviews')
        const data = await conn.json()
        return data
    } catch (error) {
        console.error('Hubo un error', error)
    }
}

export default connect