import { useState, useEffect } from "react";
import SplitText from "./SplitText";

export default function Hero() {
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        
        setAnimate(true);
    }, []);

    const handleAnimationComplete = () => {
        setAnimate(false); 
        console.log('All letters have animated!');
    };

    return (
        <SplitText
            text="Todo App"
            className="text-6xl text-center font-mono mb-10"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            animate={animate} 
        />
    );
}