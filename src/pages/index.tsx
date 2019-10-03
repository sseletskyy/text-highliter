import React from 'react'
import { Provider } from 'react-redux'
import { Highlighter } from '../components/highlighter'
import store from '../data/store'

const Home = () => (
    <Provider store={store}>
        <Highlighter />
    </Provider>
)

export default Home
