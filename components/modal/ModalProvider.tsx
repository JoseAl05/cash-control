'use client'

import { useEffect, useState } from 'react';
import ExpenseModal from './ExpenseModal';
import IncomeModal from './IncomeModal';

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
            <ExpenseModal />
            <IncomeModal />
        </>
    );
}

export default ModalProvider;