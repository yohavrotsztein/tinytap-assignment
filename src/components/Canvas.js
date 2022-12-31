import React, { useRef, useState } from 'react';
import { Image, Stage, Layer, Group, Line } from 'react-konva';
import useImage from 'use-image';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Canvas = (props) => {

  const [image] = useImage(props.img);
  const [shapePoints, setShapePoints] = useState([]);
  const [shapeDone, setShapeDone] = useState(false);
  const stageRef = useRef(null);
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [open, setOpen] = useState(false);

  const handleMouseDown = (e) => {
    if (shapeDone === false) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { points: [pos.x, pos.y] }]);
      setShapePoints((prevShapePoints) => [...prevShapePoints, { x: e.currentTarget.pointerPos.x, y: e.currentTarget.pointerPos.y, }]);
    }
  };


  const handleMouseMove = (e) => {
    if (shapeDone === false) {
      // no drawing - skipping
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      setShapePoints((prevShapePoints) => [...prevShapePoints, { x: e.currentTarget.pointerPos.x, y: e.currentTarget.pointerPos.y, }]);
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    setShapeDone(true)

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setShapePoints([])
    setShapeDone(false)
    setLines([])
    setOpen(false);
  };

  return (
    <>
      <Stage
        ref={stageRef}
        width={600}
        // width="100%"
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Image image={image} width={600} height={400} align="center" />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#333"
              strokeWidth={1}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              closed
              fill="#333"
            />
          ))}
          {shapePoints.length !== 0 && (
            <Group clipFunc={ctx => {
              ctx.beginPath()
              ctx.moveTo(shapePoints.x, shapePoints.y)
              shapePoints.map((line, i) => (
                ctx.lineTo(line.x, line.y)
              ))
              ctx.lineTo(shapePoints[0].x, shapePoints[0].y)
              ctx.font = "bold 14px verdana, sans-serif";
              var message2 = "Click on the shape to delete it";
              ctx.textAlign = "start";
              ctx.textBaseline = "bottom";
              ctx.shadowColor="black";
              ctx.shadowBlur=7;
              ctx.fillStyle = "#ffffff"; //<======= and here
              ctx.fillText(message2, shapePoints[0].x, shapePoints[0].y);
              ctx.stroke();
              ctx.closePath()

            }}
              draggable
              stroke="#333"
              onClick={handleClickOpen}
            >
              <Image image={image} width={600} height={400} fill="black" />
            </Group>
          )}
        </Layer>
      </Stage>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Shape?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this piece
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} variant='contained' sx={{backgroundColor: "#0CC5F9"}}>Delete</Button>
          <Button onClick={handleClose} autoFocus sx={{color: "#0CC5F9"}}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Canvas;