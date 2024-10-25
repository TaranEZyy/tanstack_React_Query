import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Pagination, Grid } from '@mui/material/';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Tilt from 'react-parallax-tilt';

// Card Component
function ImgMediaCard({ news }) {
  return (
    <Grid container spacing={2}>
      {news.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
           <Tilt transitionSpeed={700} glareEnable={true} glarePosition="all" glareColor="gray" gyroscope={true}>
          <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
            <CardMedia
              component="img"
              alt="news image"
              height="140"
              image={item.image_url || 'https://via.placeholder.com/140'}
              
           />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={item.link} target="_blank" rel="noopener noreferrer">
                Read More
              </Button>
            </CardActions>
          </Card>
          </Tilt>
        </Grid>
      ))}
    </Grid>
  );
}

// Main Pages Component
function Pages() {
  const queryClient = useQueryClient(); // Use useQueryClient hook to get queryClient instance
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = React.useState(1);

  // Fetch news with useQuery
  const { data = [], error, isLoading, isPreviousData } = useQuery({
    queryKey: ['news', currentPage], // Include currentPage in the query key
    queryFn: async () => {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_5452935aa601f9c02cb10778b1b308c8c0d0a&country=in&language=en&category=science,sports,entertainment`
      );
      const data = await response.json();
      return data.results; // Return the results
    },
    keepPreviousData: true, // Keep the previous data while fetching new data
  });

  // Check the query cache
  const cachedData = queryClient.getQueryData(['news', currentPage]);
  console.log('Is data cached for this page?', cachedData !== undefined);
  console.log('Cached data:', cachedData);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching news: {error.message}</div>;

  // Calculate the number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice the news data for the current page
  const currentNews = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        sx={{ marginTop: 2 }}
        color="primary"
      />
      <br /> <br />
      <ImgMediaCard news={currentNews} />
    </div>
  );
}

export default Pages;
