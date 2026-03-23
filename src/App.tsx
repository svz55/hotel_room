import { Container, Grid, Typography } from '@mui/material';
import RoomsList from './features/rooms/RoomsList';
import HousekeepersList from './features/housekeepers/HousekeepersList';
import AssignmentPanel from './features/assignments/AssignmentPanel';
import DirtyRoomsForm from './features/rooms/DirtyRoomsForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    background: {
      default: '#f4f5f7',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '20px' }}>
          Управление уборкой номеров
        </Typography>
        <DirtyRoomsForm />
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <RoomsList />
          </Grid>
          <Grid xs={12} md={4}>
            <HousekeepersList />
            <AssignmentPanel />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
