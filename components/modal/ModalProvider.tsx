'use client'

import { useEffect, useState } from 'react';
import CreateExpenseModal from './CreateExpenseModal';
import CreateIncomeModal from './CreateIncomeModal';

const ModalProvider = () => {

    const [isMounted,setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }

    return (
        <>
            <CreateExpenseModal />
            <CreateIncomeModal />
        </>
    );
}

export default ModalProvider;