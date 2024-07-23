import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Box, Typography, List, ListItem, ListItemText, ListItemIcon, Chip, IconButton,
  Paper, Divider, Button, Collapse, Fade, Badge, Avatar
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNotifications } from '../../../contexts/NotificationContext/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

const StyledPaper = styled(Paper)`
  max-height: ${({ compact }) => compact ? '100%' : '70vh'};
  width: ${({ compact }) => compact ? '100%' : '350px'};
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ compact, theme }) => compact ? 'none' : theme.shadows[5]};
  border-radius: ${({ compact, theme }) => compact ? 0 : theme.shape.borderRadius * 2}px;
`;

const NotificationList = styled(List)`
  max-height: ${({ compact }) => compact ? '100%' : 'calc(70vh - 120px)'};
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.4em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.divider};
    border-radius: 4px;
  }
`;

const StyledListItem = styled(ListItem)`
  padding: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;

const NotificationIcon = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, type }) => theme.palette[type].light};
  color: ${({ theme, type }) => theme.palette[type].main};
`;

const Notifications = ({ onClose, compact }) => {
  const { notifications, removeNotification } = useNotifications();
  const [expanded, setExpanded] = useState({});

  const getIcon = (type) => {
    switch(type) {
      case 'warning': return <WarningIcon />;
      case 'info': return <InfoIcon />;
      case 'success': return <CheckCircleIcon />;
      default: return <InfoIcon />;
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveAll = () => {
    notifications.forEach(notif => removeNotification(notif.id));
    if (onClose) onClose();
  };

  return (
    <StyledPaper elevation={compact ? 0 : 3} compact={compact}>
      <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">
          <Badge badgeContent={notifications.length} color="secondary">
            <NotificationsIcon color="primary" />
          </Badge>
          <Box component="span" ml={1}>Notificaciones</Box>
        </Typography>
        {notifications.length > 0 && (
          <Button variant="outlined" size="small" onClick={handleRemoveAll}>
            Clear All
          </Button>
        )}
      </Box>
      <Divider />
      <NotificationList compact={compact}>
        <AnimatePresence>
          {notifications.map((notification) => (
            <Fade key={notification.id} in={true}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StyledListItem>
                  <ListItemIcon>
                    <NotificationIcon type={notification.type}>
                      {getIcon(notification.type)}
                    </NotificationIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant={compact ? "body1" : "subtitle1"} fontWeight="bold">
                        {notification.message}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography variant="caption" display="block" gutterBottom>
                          {new Date(notification.date).toLocaleString()}
                        </Typography>
                        {!compact && (
                          <>
                            <Collapse in={expanded[notification.id]}>
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {notification.description || 'No additional details available.'}
                              </Typography>
                            </Collapse>
                            <Button 
                              size="small" 
                              onClick={() => toggleExpand(notification.id)}
                              startIcon={expanded[notification.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                              {expanded[notification.id] ? 'Less' : 'More'}
                            </Button>
                          </>
                        )}
                      </React.Fragment>
                    }
                  />
                  <Box display="flex" flexDirection="column" alignItems="flex-end">
                    <Chip
                      label={notification.type}
                      color={notification.type}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => removeNotification(notification.id)}
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </StyledListItem>
              </motion.div>
            </Fade>
          ))}
        </AnimatePresence>
      </NotificationList>
    </StyledPaper>
  );
};

export default Notifications;