const express = require('express')

const app = express()
const PORT = 3001

app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const matchingPersons = (newName) => {
    return persons.filter(
        person => person.name.toLowerCase() === newName.toLowerCase()
    )
}

app.get('/api/persons', (request, response) => {
    response.status(200).send(persons)
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    const match = matchingPersons(person.name).length;
    (() => {
        switch (true) {
            case person.name && person.number && !match:
                const newPerson = {...person, id: Math.max(...persons.map(person => person.id)) + 1}
                persons = [...persons, newPerson]
                return response.status(201).send(newPerson)
            case !person.name || !person.number:
                return response.status(400).send({error: 'Missing input'})
            case match >= 1:
                return response.status(400).send({error: 'Name must be unique'})
        }
    })()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id);
    (() => {
        switch (person ? 'found' : 'not-found') {
            case 'found':
                return response.json(person)
            case 'not-found':
                return response.status(404).end(`Cannot GET /api/persons/${id}`)
        }
    })()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id);
    (() => {
        switch (person ? 'found' : 'not-found') {
            case 'found':
                persons = persons.filter(person => person.id !== id)
                return response.status(204).end()
            case 'not-found':
                return response.status(404).end(`Cannot DELETE /api/persons/${id}`)
        }
    })()
})

app.get('/info', (request, response) => {
    response.status(200).send(`
        <p>Phonebook has info for ${persons.length} persons</p>
        <p>${new Date()}</p>
    `)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})