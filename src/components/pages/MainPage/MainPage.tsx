import React, { useState, useEffect } from 'react';

import { IoDocumentTextOutline } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import Form from '../../Form/Form';
import Table from '../../Table/Table';

import { fetchUsersData } from '../../../app/slices/tableSlice';
import { switchTableDataLoadingStatus } from '../../../app/slices/tableSlice';

import { setRequestCount } from '../../../app/slices/tableSlice';

import './mainPage.scss';

// /. imports

const MainPage: React.FC = () => {

    const {
        status,
        requestСount,
        isTableDataLoading,
        tableData
    } = useAppSelector(state => state.tableSlice);
    const [text, setText] = useState<string>('заявок');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsersData());
    }, []);

    useEffect(() => {
        if (status === 'loading') {
            setTimeout(() => {
                dispatch(switchTableDataLoadingStatus(true));
            }, 3500);
        } else {
            setTimeout(() => {
                dispatch(switchTableDataLoadingStatus(false));
            }, 3500);
        }
    }, [status]);

    useEffect(() => {
        dispatch(setRequestCount(tableData.length));
        if (requestСount >= 5 || requestСount === 0) {
            setText('заявок');
        } else if (requestСount >= 2 || requestСount <= 4) {
            setText('заявки');
        } else if (requestСount === 1) {
            setText('заявка');
        };
    }, [requestСount, tableData]);

    return (
        <div className="main-page">
            <div className="main-page__wrapper">
                <div className="relult">
                    <div className="relult__wrapper">
                        <IoDocumentTextOutline size={'34px'} />
                        <h1 className="relult__text">{isTableDataLoading ? '0' : requestСount} {text}</h1>
                    </div>
                </div>
                <Form />
                <Table />
            </div>
        </div>
    );
};

export default MainPage;
