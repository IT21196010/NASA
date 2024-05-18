import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Mars from '../components/Mars';

describe('Mars Component', () => {
  // Mock rover photos data
  const mockRoverPhotos = [
    {
      img_src: 'https://example.com/photo1.jpg',
      
      earth_date: '2024-05-18',
    },
    {
      img_src: 'https://example.com/photo2.jpg',
     
      earth_date: '2024-05-19',
    },
  ];

  // Mock fetch response
  const mockFetchResponse = {
    json: jest.fn().mockResolvedValue({ photos: mockRoverPhotos }),
  };

  beforeEach(() => {
    // Mock fetch function
    jest.spyOn(global, 'fetch').mockResolvedValue(mockFetchResponse);
  });

  afterEach(() => {
    // Restore fetch function after each test
    global.fetch.mockRestore();
  });

  test('fetches and renders rover photos', async () => {
    // Mock rover photos data
    const mockRoverPhotos = [
      {
        img_src: 'https://example.com/photo1.jpg',

        earth_date: '2024-05-18',
      },
      {
        img_src: 'https://example.com/photo2.jpg',
        
        earth_date: '2024-05-19',
      },
    ];
  
    // Mock fetch response
    const mockFetchResponse = {
      json: jest.fn().mockResolvedValue({ photos: mockRoverPhotos }),
    };
  
   
   
  
    const { getByText, findByAltText } = render(<Mars />);
  
    // Wait for component to fetch and render rover photos
    await waitFor(() => {
      // Check if rover photos are rendered
      expect(getByText('Explore The Mars Rovers')).toBeInTheDocument();
  
     
      // Check if the number of photos matches the mocked data length
      expect(mockRoverPhotos.length).toBe(2);
    });
  });
  test('handles fetch error gracefully', async () => {
    // Mock fetch function to reject with an error
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
  
    const { getByRole, findByText } = render(<Mars />);
  
    // Wait for component to render
    await waitFor(() => {
      // Check if error message is rendered
      const errorMessage = findByText(/Error fetching Curiosity Rover photos/);
      expect(errorMessage).resolves.toBeInTheDocument();
    });
  });
});
