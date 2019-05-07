import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/bootstrap.min.css'
import ApolloClient, {HttpLink} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    request: (operation) => {
        const token = localStorage.getItem('token');
        let headers = {};
        if (token) {
            headers = { authorization: `Token ${token}` }
        }
        operation.setContext({ headers })
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
