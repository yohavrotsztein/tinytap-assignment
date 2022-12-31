import { Typography, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { ReactComponent as Empty } from '../assets/empty_state.svg';


const StyledDropZone = styled('div')(({ theme }) => ({
  height: 500,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,

}));

export default function EmptyState() {
  return (
    <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <StyledDropZone>
        <Empty />
        <Typography variant="caption">Upload a photo to start creating a game</Typography>
      </StyledDropZone>
    </Box>
  )
}