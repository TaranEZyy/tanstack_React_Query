import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// Component to display individual news items in a card
function NewsCard({ currentItems }) {
  return (
    <Grid container spacing={2}>
      {currentItems &&
        currentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image_url || 'https://via.placeholder.com/140'}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ mt: 2 }}
                >
                  Read more
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

function PaginatedNews({ itemsPerPage }) {
  const [items, setItems] = useState([]); // Store fetched news items
  const [page, setPage] = useState(1);

  // Fetch news from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsdata.io/api/1/news?apikey=pub_5452935aa601f9c02cb10778b1b308c8c0d0a&country=in&language=en&category=science,sports,entertainment'
        );
        const fetchedItems = response.data.results;
        setItems(fetchedItems); // Store all items from the API response
      } catch (error) {
        console.error('Error fetching the news:', error);
      }
    };

    fetchNews();
  }, []);

  // Calculate the current news items and total page count
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startOffset = (page - 1) * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  const currentItems = items.slice(startOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage); // Dynamically calculate page count

  return (
    <div>
      
      <Stack spacing={2} sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Stack> <br />

      <NewsCard currentItems={currentItems} />
    </div>
  );
}

export default PaginatedNews;
