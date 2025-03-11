import { io } from 'socket.io-client';

const API_URL = 'http://localhost:3000';

export const socket = io(API_URL);

export const api = {
  async getUsers() {
    const response = await fetch(`${API_URL}/api/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  async simulateAccess(cardId: string, location: string) {
    const response = await fetch(`${API_URL}/api/access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardId, location }),
    });
    if (!response.ok) {
      throw new Error('Failed to simulate access');
    }
    return response.json();
  }
};