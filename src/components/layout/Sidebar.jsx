import '../../assets/css/general.css';
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Box, Avatar, Typography, Menu, MenuItem, Collapse, Tooltip, List, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext';

/* ICONOS */
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import logo from '../../assets/images/aerocentro.png';

const drawerWidth = 240;

const openedMixin = (theme) => ({ width: drawerWidth, transition: theme.transitions.create('width',{ easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }), overflowX: 'hidden' });
const closedMixin = (theme) => ({ transition: theme.transitions.create('width',{ easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }), overflowX: 'hidden', width: `calc(${theme.spacing(8)} + 1px)` });

const DrawerHeader = styled('div')(({ theme }) => ({ display:'flex', alignItems:'center', justifyContent:'flex-end', padding: theme.spacing(0,1), ...theme.mixins.toolbar }));

const Drawer = styled(MuiDrawer, { shouldForwardProp:(prop)=>prop!=='open' })(({ theme, open }) => ({
  width: drawerWidth, whiteSpace:'nowrap', boxSizing:'border-box', flexShrink:0,
  ...(open && { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }),
  ...(!open && { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) })
}));

const IconButtonWithTooltip = ({ open, title, children }) => !open ? <Tooltip title={title} placement="right" arrow><Box>{children}</Box></Tooltip> : children;

export const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme, theme: themeMode } = useThemeMode();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElGestiones, setAnchorElGestiones] = useState(null);
  const [anchorElInventario, setAnchorElInventario] = useState(null);

  const [openGestiones, setOpenGestiones] = useState(false);
  const [openInventario, setOpenInventario] = useState(false);

  const isSelected = (path) => location.pathname === path;
  const handleNavigation = (path) => navigate(path);

  const handleGestionesClick = (e) => open ? setOpenGestiones(!openGestiones) : setAnchorElGestiones(e.currentTarget);
  const handleInventarioClick = (e) => open ? setOpenInventario(!openInventario) : setAnchorElInventario(e.currentTarget);

  const gestionesItems = [
    { text:'Usuarios', icon:<PeopleIcon sx={{fontSize:18}}/>, path:'/usuarios' },
    { text:'Clientes', icon:<GroupIcon sx={{fontSize:18}}/>, path:'/clientes' },
    { text:'Proveedores', icon:<LocalShippingIcon sx={{fontSize:18}}/>, path:'/proveedores' }
  ];

  const inventarioItems = [
    { text:'Productos', icon:<InventoryIcon sx={{fontSize:18}}/>, path:'/productos' },
    { text:'Categorías', icon:<CategoryIcon sx={{fontSize:18}}/>, path:'/categorias' },
    { text:'Marcas', icon:<BrandingWatermarkIcon sx={{fontSize:18}}/>, path:'/marcas' },
    { text:'Almacenes', icon:<WarehouseIcon sx={{fontSize:18}}/>, path:'/almacenes' },
    { text:'Kardex', icon:<SwapHorizIcon sx={{fontSize:18}}/>, path:'/kardex' }
  ];

  const itemStyle = { minHeight:40, px:2, borderRadius:1, mx:0.5, '&:hover':{ bgcolor: themeMode.palette.action.hover } };

  return (
    <Drawer variant="permanent" open={open}>
      
      {/* HEADER */}
      <DrawerHeader>
        <Box sx={{ display:'flex', alignItems:'center', flex:1, ml:1, gap:1 }}>
          <Avatar src={logo} sx={{width:30,height:30}} />
          {open && <Box><Typography sx={{fontSize:'0.75rem',fontWeight:'bold'}}>Aerocentro</Typography><Typography sx={{fontSize:'0.6rem'}}>Versión 1.0</Typography></Box>}
        </Box>
        <IconButton onClick={handleDrawerClose}>{theme.direction==='rtl'?<ChevronRightIcon/>:<ChevronLeftIcon/>}</IconButton>
      </DrawerHeader>

      <Divider/>

      {/* PERFIL */}
      <Box onClick={(e)=>setAnchorEl(e.currentTarget)} sx={{p:1,pl:2,cursor:'pointer',borderBottom:'1px solid #ddd'}}>
        <Box sx={{display:'flex',alignItems:'center',gap:1,width:'100%'}}>
          <Tooltip title="Cesar Castedo" placement="right"><Avatar sx={{width:32,height:32}}>C</Avatar></Tooltip>
          {open && <Box><Typography sx={{fontSize:'0.8rem',fontWeight:'bold'}}>Cesar Castedo</Typography><Typography sx={{fontSize:'0.65rem',color:'text.secondary'}}>Administrador</Typography></Box>}
          {open && <Box sx={{ml:'auto',display:'flex',flexDirection:'column',alignItems:'center'}}><KeyboardArrowUpIcon sx={{fontSize:16}}/><KeyboardArrowDownIcon sx={{fontSize:16,mt:-0.5}}/></Box>}
        </Box>
      </Box>

      {/* MENU PERFIL */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={()=>setAnchorEl(null)} anchorOrigin={{vertical:'center',horizontal:'right'}} transformOrigin={{vertical:'center',horizontal:'left'}} PaperProps={{sx:{mt:1,minWidth:200,borderRadius:2,overflow:'hidden'}}}>
        <Box sx={{p:1.5,display:'flex',alignItems:'center',gap:1,borderBottom:'1px solid',borderColor:'divider'}}>
          <Avatar sx={{width:32,height:32}}>C</Avatar>
          <Box><Typography sx={{fontSize:'0.8rem',fontWeight:'bold'}}>Cesar Castedo</Typography><Typography sx={{fontSize:'0.65rem',color:'text.secondary'}}>Administrador</Typography></Box>
        </Box>

        <MenuItem onClick={toggleTheme} sx={{p:1.5,borderBottom:'1px solid',borderColor:'divider',display:'flex'}}>
          {isDarkMode?<DarkModeIcon sx={{mr:1,fontSize:18}}/>:<LightModeIcon sx={{mr:1,fontSize:18}}/>}
          <Typography sx={{fontSize:'0.75rem'}}>Cambiar estilo</Typography>
          <Typography sx={{fontSize:'0.7rem',ml:'auto',color:'text.secondary'}}>{isDarkMode?'Oscuro':'Claro'}</Typography>
        </MenuItem>

        <MenuItem sx={{p:1.5}}>
          <LogoutIcon sx={{mr:1,fontSize:18}}/>
          <Typography sx={{fontSize:'0.75rem'}}>Cerrar sesión</Typography>
        </MenuItem>
      </Menu>

      {/* MENU */}
      <List sx={{py:1}}>

        {/* DASHBOARD */}
        <IconButtonWithTooltip open={open} title="Dashboard">
          <ListItem disablePadding>
            <ListItemButton sx={{...itemStyle,justifyContent:open?'initial':'center'}} onClick={()=>handleNavigation('/')}>
              <ListItemIcon sx={{minWidth:0,mr:open?2:0}}><DashboardIcon/></ListItemIcon>
              {open && <ListItemText primary="Dashboard"/>}
            </ListItemButton>
          </ListItem>
        </IconButtonWithTooltip>

        {/* GESTIONES */}
        <IconButtonWithTooltip open={open} title="Gestiones">
          <ListItem disablePadding>
            <ListItemButton sx={{...itemStyle,justifyContent:open?'initial':'center'}} onClick={(e)=>handleGestionesClick(e)}>
              <ListItemIcon sx={{minWidth:0,mr:open?2:0}}><PeopleIcon/></ListItemIcon>
              {open && <><ListItemText primary="Gestiones"/>{openGestiones?<ExpandLess/>:<ExpandMore/>}</>}
            </ListItemButton>
          </ListItem>
        </IconButtonWithTooltip>

        <Collapse in={open && openGestiones}>
          <List disablePadding>
            {gestionesItems.map((item)=>(
              <ListItem key={item.text} disablePadding>
                <ListItemButton sx={{...itemStyle,pl:4}} onClick={()=>handleNavigation(item.path)}>
                  <ListItemIcon sx={{minWidth:0,mr:2}}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {!open && (
          <Menu anchorEl={anchorElGestiones} open={Boolean(anchorElGestiones)} onClose={()=>setAnchorElGestiones(null)}>
            {gestionesItems.map((item)=>(
              <MenuItem key={item.text} onClick={()=>{handleNavigation(item.path);setAnchorElGestiones(null);}}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        )}

        {/* INVENTARIO */}
        <IconButtonWithTooltip open={open} title="Inventario">
          <ListItem disablePadding>
            <ListItemButton sx={{...itemStyle,justifyContent:open?'initial':'center'}} onClick={(e)=>handleInventarioClick(e)}>
              <ListItemIcon sx={{minWidth:0,mr:open?2:0}}><InventoryIcon/></ListItemIcon>
              {open && <><ListItemText primary="Inventario"/>{openInventario?<ExpandLess/>:<ExpandMore/>}</>}
            </ListItemButton>
          </ListItem>
        </IconButtonWithTooltip>

        <Collapse in={open && openInventario}>
          <List disablePadding>
            {inventarioItems.map((item)=>(
              <ListItem key={item.text} disablePadding>
                <ListItemButton sx={{...itemStyle,pl:4}} onClick={()=>handleNavigation(item.path)}>
                  <ListItemIcon sx={{minWidth:0,mr:2}}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {!open && (
          <Menu anchorEl={anchorElInventario} open={Boolean(anchorElInventario)} onClose={()=>setAnchorElInventario(null)}>
            {inventarioItems.map((item)=>(
              <MenuItem key={item.text} onClick={()=>{handleNavigation(item.path);setAnchorElInventario(null);}}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        )}

      </List>
    </Drawer>
  );
};