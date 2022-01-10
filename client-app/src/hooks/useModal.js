import { useState } from 'react';

export default function useModal()
{
    const [isShowing, setIsShowing] = useState(false);

    const toggle = () => setIsShowing(!isShowing);

    return {
        isShowing,
        toggle,
    }
};


