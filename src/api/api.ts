import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://nufirhmuq5fi3nnmiod7mqbhuq.appsync-api.ap-east-1.amazonaws.com/graphql', // dev3
  // baseURL: 'https://ckcisswrprhmzgowebu3j6ihmy.appsync-api.ap-east-1.amazonaws.com/graphql', // dev
  // baseURL: process.env.NEXT_PUBLIC_APP_STAGE || '',
  headers: {
    'Content-Type': 'application/json',
  },
});
