import { useContext } from 'react';
import { AppContext } from '../providers/AppProvider';

export default function () {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within an AppProvider');

    return context;
}
