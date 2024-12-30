import { useRef, useEffect, useState } from "react";

const Squares = ({
  direction = "right", // Animation direction: 'right', 'left', 'up', 'down', 'diagonal'
  speed = 1, // Speed of animation
  borderColor = "#999", // Color of square borders
  hoverFillColor = "#222", // Color of square when hovered
}) => {
  const canvasRef = useRef(null); // Reference to the canvas element
  const requestRef = useRef(null); // Animation frame request reference
  const squareSize = 50; // Size of each square in pixels
  const numSquaresX = useRef();
  const numSquaresY = useRef();
  const gridOffset = useRef({ x: 0, y: 0 }); // Grid offset for animation
  const [hoveredSquare, setHoveredSquare] = useState(null); // Hovered square state

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < numSquaresX.current; x++) {
        for (let y = 0; y < numSquaresY.current; y++) {
          const squareX =
            x * squareSize + (gridOffset.current.x % squareSize);
          const squareY =
            y * squareSize + (gridOffset.current.y % squareSize);

          // Fill square if hovered
          if (
            hoveredSquare &&
            hoveredSquare.x === x &&
            hoveredSquare.y === y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          // Set the border color
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const updateAnimation = () => {
      switch (direction) {
        case "right":
          gridOffset.current.x -= speed;
          break;
        case "left":
          gridOffset.current.x += speed;
          break;
        case "down":
          gridOffset.current.y += speed;
          break;
        case "up":
          gridOffset.current.y -= speed;
          break;
        case "diagonal":
          gridOffset.current.x -= speed;
          gridOffset.current.y -= speed;
          break;
        default:
          break;
      }

      if (Math.abs(gridOffset.current.x) > squareSize)
        gridOffset.current.x = 0;
      if (Math.abs(gridOffset.current.y) > squareSize)
        gridOffset.current.y = 0;

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Calculate which square is hovered
      const hoveredSquareX = Math.floor(
        (mouseX - (gridOffset.current.x % squareSize)) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY - (gridOffset.current.y % squareSize)) / squareSize
      );

      setHoveredSquare({ x: hoveredSquareX, y: hoveredSquareY });
    };

    const handleMouseLeave = () => {
      setHoveredSquare(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, hoveredSquare]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full border-none block"
    ></canvas>
  );
};

export default Squares;
