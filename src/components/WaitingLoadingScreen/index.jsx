import styled from 'styled-components'

const LoginContainer = styled.div`
    margin: 30px;
    background-color: #fff;
    padding: 60px 90px;
    dispay: flex;
    flex-direction: row;
`
const LeftCol = styled.div`
    dispay: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`

const StyledTitle = styled.h2`
    padding-bottom: 30px;
    line-height: 50px;
    color: #000;
`

function Login() {
    return (
        <LoginContainer>
            <LeftCol>
                <StyledTitle>Connectez-vous</StyledTitle>
            </LeftCol>
        </LoginContainer>
    )
}

export default Login
