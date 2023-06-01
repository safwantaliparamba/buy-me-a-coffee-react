import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../../store/authSlice'


const Home = () => {
    const dispatch = useDispatch()

    const logoutHandler = ()=>  dispatch(logout())

    return (
        <Wrapper>
            <h1>Home</h1>

            <Link to='/sign-in'>Sign In</Link>
            <Link to='/sign-up'>Sign Up</Link>
            <span onClick={logoutHandler}>Logout</span>
        </Wrapper>
    )
}

export default Home

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    h1{
        font-size: 28px;
    }
`