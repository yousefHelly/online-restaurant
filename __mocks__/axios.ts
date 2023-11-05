jest.unmock('axios');
import MockAdapter from 'axios-mock-adapter';
import axios from './../lib/api/axios';
const mock = new MockAdapter(axios);
const authPostValue: Partial<AuthResponse>&{
    verificationCode: string
} = {
    verificationCode:'ABCDEF',
    firstName:'yousef',
    email:'yousef.helly@gmail.com',
} 
mock.onPost('/api/Auth/register').reply(200, authPostValue)