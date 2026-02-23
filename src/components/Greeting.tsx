import MuiTheme from './MuiTheme';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';

interface GreetingProps {
  readonly name?: string;
}

export default function Greeting({ name = 'Task Goblin' }: GreetingProps) {
  return (
    <MuiTheme>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6">
        <Box className="flex flex-col items-center gap-6 max-w-md w-full">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            ¡Hola, {name}! 👋
          </h1>
          <p className="text-slate-600 text-center">
            Tailwind CSS + Material UI listos para usar.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              size="medium"
            >
              Listo
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddTaskIcon />}
              size="medium"
            >
              Nueva tarea
            </Button>
          </div>
        </Box>
      </div>
    </MuiTheme>
  );
}
