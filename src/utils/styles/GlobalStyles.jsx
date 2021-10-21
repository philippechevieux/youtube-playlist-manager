import { createGlobalStyle } from 'styled-components'
// import { useTheme } from './../hooks/index'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif
    }
`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle
