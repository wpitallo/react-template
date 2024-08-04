import { useContext } from 'react';
import { PageContext } from '../PageProvider';

const usePage = () => {
    return useContext(PageContext);
};

export default usePage;
