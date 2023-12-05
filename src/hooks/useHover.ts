import { useState } from "react";
import { img_500 } from "../Services/Config";

export const useHover = (name: string) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = (backDropPath: string) => {
        const othersElement = document.querySelector(name)as HTMLDivElement
        if (othersElement) {
            othersElement.style.backgroundImage = `url(${img_500 + backDropPath})`;
            setIsHovered(true)
        }
    }
    
    const handleLeave = () => {
        const othersElement = document.querySelector(name)as HTMLDivElement
        if (othersElement) {
            othersElement.style.backgroundImage = ''
            setIsHovered(false)
        }
    };
  return {isHovered, handleHover, handleLeave}
}

