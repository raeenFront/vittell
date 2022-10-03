
import { createTheme } from '@material-ui/core/styles'
export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    direction: 'rtl',
    typography: {
        fontSize: 1.6,
        fontFamily: "IRANSans"
    },
    palette: {
        primary: {
            main: '#ef4b4c',
        },
        secondary: {
            main: '#555',
            titleColor: '#111'
        },
        initial: {
            main: '#4C4C4C',
        },
    },
});