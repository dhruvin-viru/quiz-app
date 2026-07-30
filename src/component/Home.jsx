import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, Button, Box } from '@mui/material'


function Home() {
    const [difficulty, setDifficulty] = useState('easy')

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>Welcome to the Quiz</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>Choose a difficulty then press Start Quiz.</Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Button variant={difficulty === 'easy' ? 'contained' : 'outlined'} color="primary" onClick={() => setDifficulty('easy')}>Easy</Button>
                <Button variant={difficulty === 'medium' ? 'contained' : 'outlined'} color="primary" onClick={() => setDifficulty('medium')}>Medium</Button>
                <Button variant={difficulty === 'hard' ? 'contained' : 'outlined'} color="primary" onClick={() => setDifficulty('hard')}>Hard</Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Link variant="contained" color="success" to={`/quize/0/${difficulty}`}>Start Quiz</Link>
            </Box>
        </Container>
    )
}

export default Home