import React, { useRef, useEffect, useState } from 'react';

function mandelbrotIterCount(xi: number, yi: number, maxIter: number): number {
    let x = 0; 
    let y = 0; 
    let iter = 0;

    while (x * x + y * y <= 4 && iter < maxIter)
    {
        const xTemp = x * x - y * y + xi;
        y = 2 * x * y + yi;
        x = xTemp;
        iter++;
    }
    return iter;
}

const Mandelbrot: React.FC = () => {
    const [maxIter, setMaxIter] = useState(100);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxIter(Number(event.target.value));
      };
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
    
        const width = canvas.width;
        const height = canvas.height;
        const imageData = context.createImageData(width, height);

        for (let px = 0; px < width; px++)
        {
            for (let py = 0; py < height; py++)
            {
                const x0 = (px / width) * 3.5 - 2.5;
                const y0 = (py / height) * 2.0 - 1.0;
                //calculate if in set
                const iter = mandelbrotIterCount(x0, y0, maxIter);

                //hardcore rgba value writing..
                const pixel = (py * width + px) * 4;
                //give color
                const color = iter === maxIter ? 0 : (iter * 5) % 256;
                imageData.data[pixel] = color * iter % 255;
                imageData.data[pixel + 1] = color * iter % 255;
                imageData.data[pixel + 2] = color * 2 * iter % 255;
                imageData.data[pixel + 3] = 255;

            }
        }
        context.putImageData(imageData, 0, 0,)
    }, [maxIter]); //dependency array on maxiter so slider recalculates.
    
    return (
        <div>
            <h1>The Mandelbrot Set</h1>
            <h3>The Mandelbrot set is a mesmerizing fractal born from a simple rule—repeatedly squaring a complex number 
                and adding a constant. When plotted, each point that stays “bound” paints itself black, 
                while those that escape burst into color based on how quickly they fly off to infinity. 
                Dive in, and you’ll discover endless spirals, filigrees, and echoes of the whole, unfolding forever at every level of zoom. 
                (Definitely not written by ai...)
            </h3>
            <canvas ref={canvasRef} width={1000} height={600} />
            <div>
                <input type='range' min='10' max='500' value={maxIter} onChange={handleSliderChange}/>  
                <span>Maximum iterations (10-500): {maxIter}</span>
            </div>
        </div>
    );
};

export default Mandelbrot;