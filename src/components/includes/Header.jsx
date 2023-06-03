import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ThemeToggle from './ToggleTheme'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'


const Header = () => {
    const name = useSelector(state => state.auth.name)
    const theme = useSelector(state => state.ui.theme)

    const dispatch = useDispatch()

    const logoutHandler = ()=>  dispatch(logout())

    return (
        <Wrapper theme={theme}>
            <Logo theme={theme}>Buy me a coffee</Logo>
            <Right theme={theme}>
                <span>{name}</span>
                <span onClick={logoutHandler}>Logout</span>
                <ThemeToggle />
            </Right>
        </Wrapper>
    )
}

export default Header


const Wrapper = styled.header`
    padding: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme}) => theme === "DARK" ? "#111" : "#fff"};
    
    &, *{
        transition: all 0.4s ease-in-out;
    }
`

const Logo = styled.div`
    font-size: 24px;
    color: ${({theme}) => theme === "DARK" ? "#fff" : "#111"};
`
const Right = styled.nav`
    display: flex;
    align-items: center;
    gap: 22px;

    span{
        font-size: 18px;
        cursor: pointer;
        color: ${({theme}) => theme === "DARK" ? "#fff" : "#111"};
    }
`