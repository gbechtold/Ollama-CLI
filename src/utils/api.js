import axios from 'axios';

const api = axios.create({
  baseURL: process.env.OLLAMA_API_URL,
});

export const listModels = async () => {
  try {
    const response = await api.get('/api/tags');
    return response.data.models;
  } catch (error) {
    console.error('Error listing models:', error.message);
    throw error;
  }
};

export const generateCompletion = async (model, prompt) => {
  try {
    const response = await api.post('/api/generate', {
      model,
      prompt,
      stream: false,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating completion:', error.message);
    throw error;
  }
};

export const startChat = async (model, messages) => {
  try {
    const response = await api.post('/api/chat', {
      model,
      messages,
      stream: false,
    });
    return response.data;
  } catch (error) {
    console.error('Error in chat:', error.message);
    throw error;
  }
};
