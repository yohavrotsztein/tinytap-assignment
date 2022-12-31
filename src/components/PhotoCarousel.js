import { useState, useRef, useEffect } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
// utils
import { Icon } from '@iconify/react';
// components
import Image from './image';
import Carousel from 'react-slick';
import { dispatch, useSelector } from '../redux/store';
import { deletePhoto } from '../redux/photos.js';
import EmptyState from './EmptyState.js';
import Canvas from "./Canvas.js";


// ----------------------------------------------------------------------

const SPEED = 160;

const THUMB_SIZE = 64;

const StyledThumbnailsContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'length',
})(({ length, theme }) => ({
  margin: theme.spacing(0, 'auto'),
  position: 'relative',

  '& .slick-slide': {
    opacity: 0.48,
    '&.slick-current': {
      opacity: 1,
    },
    '& > div': {
      padding: theme.spacing(0, 0.75),
    },
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 16,
  }),
  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),
  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),
  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
  }),
}));

// ----------------------------------------------------------------------

export default function PhotoCarousel() {


  const images = useSelector((state) => state.photos.photos)
  const theme = useTheme();
  const carousel1 = useRef(null);
  const carousel2 = useRef(null);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselSettings1 = {
    speed: SPEED,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next),

  };

  const carouselSettings2 = {
    speed: SPEED,
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: images.length > 3 ? 3 : images.length,
  };

  useEffect(() => {
    if (carousel1.current) {
      setNav1(carousel1.current);
    }
    if (carousel2.current) {
      setNav2(carousel2.current);
    }
  }, []);

  const handlePrev = () => {
    carousel2.current?.slickPrev();
  };

  const handleNext = () => {
    carousel2.current?.slickNext();
  };

  const renderLargeImg = (
    <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', position: 'relative', width: '600px', margin: '0 auto' }}>
      <Carousel {...carouselSettings1} asNavFor={nav2} ref={carousel1}  >
        {images.map((img, index) => (
          <Canvas key={index} img={img} sx={{cursor:'pointer'}}/>
        ))}
      </Carousel>
    </Box>
  );

  const renderThumbnails = (
    <StyledThumbnailsContainer length={images.length} sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <Carousel {...carouselSettings2} asNavFor={nav1} ref={carousel2}>
        {images.map((img, index) => (
          <Box>
            <IconButton
              size="small"
              onClick={() => dispatch(deletePhoto(img))}
              key={img.slice(0, 10)}
              sx={{
                top: 22,
                left: "40%",
                zIndex: 9,
                //  position: 'absolute',
                color: (theme) => alpha(theme.palette.common.white, 0.8),
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                },
              }}
            >
              <Box component={Icon} icon={'eva:close-fill'} width={18} />

            </IconButton>
            <Image
              key={img}
              // disabledEffect
              alt="thumbnail"
              src={img}
              sx={{
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                borderRadius: 1.5,
                cursor: 'pointer',
                ...(currentIndex === index && {
                  border: (theme) => `solid 2px ${theme.palette.primary.main}`,
                }),
              }}
            />
          </ Box>
        ))}
      </Carousel>
    </StyledThumbnailsContainer>
  );

  return (
    <>
      {images.length === 0 ? <EmptyState /> : null}
      <Box
        sx={{
          '& .slick-slide': {
            float: theme.direction === 'rtl' ? 'right' : 'left',
          },
        }}
      >
        {renderLargeImg}
        {images.length !== 0 ? <Typography>Please draw a path to create a puzzle piece</Typography> : null}
        {renderThumbnails}
      </Box>
    </>
  );
}
