import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    fontWeight: {
      bold: 'bold',
    },
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    },
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
    black: { main: 'black'},
    white: { main: 'white' },
  },
  spacing: 2,
});
