import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Picture from '../components/Apod';

describe('Picture Component', () => {
  test('renders picture of the day with date and description', async () => {
    const mockApodData = {
      date: '2024-05-18',
      explanation: 'This is a mock explanation for the APOD.',
      url: 'https://example.com/apod.jpg',
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApodData),
    });

    const { getByAltText, getByText } = render(<Picture />);

    await waitFor(() => {
      expect(getByAltText('Astronomy Picture of the Day')).toBeInTheDocument();
      expect(getByText('Date:')).toBeInTheDocument();
      expect(getByText(`Description: ${mockApodData.explanation}`)).toBeInTheDocument();
    });
  });

  test('handles fetch error gracefully', async () => {
    // Mock fetch function to reject with an error
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { getByText } = render(<Picture />); // Update component name

    // Wait for component to render
    await waitFor(() => {
      // Check if error message is rendered
      expect(getByText('Error fetching APOD data: Failed to fetch')).toBeInTheDocument();
    });
  });
});
