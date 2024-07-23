import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Avatar,
  IconButton, Menu, MenuItem, TablePagination, Typography, TableSortLabel,
  Chip, Collapse, Button, useTheme
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: status === 'active' ? theme.palette.success.light : theme.palette.error.light,
  color: status === 'active' ? theme.palette.success.contrastText : theme.palette.error.contrastText,
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'rut', numeric: false, disablePadding: false, label: 'RUT' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Rol' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Estado' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Acciones' },
];

const UserTable = ({ users, handleEditClickOpen, handleDeleteClickOpen, handleUserSelect }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [expandedRow, setExpandedRow] = useState(null);
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(users, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <React.Fragment key={user.id}>
                  <StyledTableRow>
                    <TableCell padding="checkbox">
                      <IconButton size="small" onClick={() => handleExpandRow(user.id)}>
                        {expandedRow === user.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={user.avatar} sx={{ mr: 2 }}>{user.firstName[0]}</Avatar>
                        <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.rut}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <StatusChip label={user.status} status={user.status} />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClickOpen(user)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClickOpen(user)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                      <Collapse in={expandedRow === user.id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Detalles del Usuario
                          </Typography>
                          <Table size="small">
                            <TableBody>
                              <TableRow>
                                <TableCell component="th" scope="row">Nombre completo</TableCell>
                                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Email</TableCell>
                                <TableCell>{user.email}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">RUT</TableCell>
                                <TableCell>{user.rut}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Rol</TableCell>
                                <TableCell>{user.role}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">Estado</TableCell>
                                <TableCell>{user.status}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Button 
                            variant="outlined" 
                            sx={{ mt: 2 }} 
                            onClick={() => handleUserSelect(user)}
                          >
                            Ver perfil completo
                          </Button>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserTable;