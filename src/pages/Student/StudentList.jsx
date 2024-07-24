import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Container, Typography, Grid, TextField, Button, Paper, Snackbar, Alert, Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputAdornment,
  Tooltip, Fade, useTheme, useMediaQuery, IconButton, Chip,
  LinearProgress, TablePagination, Backdrop, CircularProgress,MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { useStudents } from '../../hooks/useStudents/useStudents';

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledPaper = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
  }
`;

const StyledTableContainer = styled(TableContainer)`
  margin-top: ${({ theme }) => theme.spacing(3)};
  border-radius: 16px;
  overflow: hidden;
  & .MuiTableCell-head {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-weight: bold;
  }
  & .MuiTableRow-root:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;

const StyledChip = styled(Chip)`
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const AnimatedButton = styled(Button)`
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows[4]};
  }
`;

const StudentList = () => {
    const { students, isLoading, error, deleteStudent } = useStudents();
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [course, setCourse] = useState('');
    const [age, setAge] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState('lastName');
    const [order, setOrder] = useState('asc');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
        if (students) {
            setFilteredStudents(students);
        }
    }, [students]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterStudents(e.target.value, course, age);
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
        filterStudents(search, e.target.value, age);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
        filterStudents(search, course, e.target.value);
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const filterStudents = (search, course, age) => {
        let filtered = students.filter(student =>
            `${student.firstName} ${student.lastName}`.toLowerCase().includes(search.toLowerCase()) &&
            (course === '' || student.course === course) &&
            (age === '' || calculateAge(student.dob) === parseInt(age))
        );
        setFilteredStudents(filtered);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        const sortedStudents = [...filteredStudents].sort((a, b) => {
            if (a[property] < b[property]) return order === 'asc' ? -1 : 1;
            if (a[property] > b[property]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredStudents(sortedStudents);
    };

    if (error) return <Typography color="error">Error al cargar los estudiantes: {error.message}</Typography>;

    return (
        <StyledContainer>
            <Fade in={true} timeout={1000}>
                <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                            Lista de Estudiantes
                        </Typography>
                        <AnimatedButton 
                            variant="contained" 
                            color="primary" 
                            component={Link} 
                            to="/students/add"
                            startIcon={<PersonAddIcon />}
                            sx={{ borderRadius: '20px', textTransform: 'none' }}
                        >
                            Añadir Estudiante
                        </AnimatedButton>
                    </Box>
                    <StyledPaper elevation={3}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Buscar por nombre"
                                    variant="outlined"
                                    fullWidth
                                    value={search}
                                    onChange={handleSearchChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Filtrar por curso"
                                    variant="outlined"
                                    fullWidth
                                    select
                                    value={course}
                                    onChange={handleCourseChange}
                                >
                                    <MenuItem value="">Todos</MenuItem>
                                    <MenuItem value="Primero Medio">Primero Medio</MenuItem>
                                    <MenuItem value="Segundo Medio">Segundo Medio</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Filtrar por edad"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    value={age}
                                    onChange={handleAgeChange}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={2} display="flex" justifyContent="flex-end">
                            <Tooltip title="Filtros avanzados">
                                <IconButton color="primary">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Ordenar">
                                <IconButton color="primary" onClick={() => handleSort('lastName')}>
                                    <SortIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </StyledPaper>
                    {isLoading ? (
                        <Box sx={{ width: '100%', mt: 3 }}>
                            <LinearProgress />
                        </Box>
                    ) : (
                        <StyledTableContainer component={Paper} elevation={3}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Estudiante</TableCell>
                                        {!isMobile && <TableCell>RUT</TableCell>}
                                        <TableCell>Curso</TableCell>
                                        <TableCell>Edad</TableCell>
                                        {!isMobile && <TableCell>Teléfono</TableCell>}
                                        <TableCell align="center">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredStudents
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((student) => (
                                        <TableRow key={student.id} hover>
                                            <TableCell>
                                                <Typography variant="subtitle2">{`${student.firstName} ${student.lastName}`}</Typography>
                                            </TableCell>
                                            {!isMobile && <TableCell>{student.rut}</TableCell>}
                                            <TableCell>
                                                <StyledChip icon={<SchoolIcon />} label={student.course} size="small" color="primary" variant="outlined" />
                                            </TableCell>
                                            <TableCell>
                                                <StyledChip icon={<CakeIcon />} label={`${calculateAge(student.dob)} años`} size="small" color="secondary" variant="outlined" />
                                            </TableCell>
                                            {!isMobile && (
                                                <TableCell>
                                                    <StyledChip icon={<PhoneIcon />} label={student.phone} size="small" color="info" variant="outlined" />
                                                </TableCell>
                                            )}
                                            <TableCell align="center">
                                                <Tooltip title="Ver Detalles" arrow>
                                                    <AnimatedButton
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        component={Link}
                                                        to={`/students/${student.id}`}
                                                        sx={{ borderRadius: '20px', minWidth: 'auto' }}
                                                    >
                                                        <VisibilityIcon />
                                                    </AnimatedButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredStudents.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </StyledTableContainer>
                    )}
                </Box>
            </Fade>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Lista de estudiantes cargada exitosamente!
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </StyledContainer>
    );
};

export default StudentList;